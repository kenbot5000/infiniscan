<template>
  <v-container class="px-9">
    <Snackbar ref="Snackbar" />
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Orders
          </h3>
          <v-tabs>
            <v-tab @click="tab = 'all'">
              All
            </v-tab>
            <v-tab @click="tab = 'waiting'">
              Awaiting Confirmation
            </v-tab>
            <v-tab @click="tab = 'inprogress'">
              In Progress
            </v-tab>
            <v-tab @click="tab = 'confirmation'">
              Ready for Pickup
            </v-tab>
            <v-tab @click="tab = 'completed'">
              Completed
            </v-tab>
            <v-tab @click="tab = 'cancelled'">
              Cancelled
            </v-tab>
          </v-tabs>
          <v-divider />
          <v-data-table :headers="orderHeaders" :items="orderDisplay">
            <!-- Columns -->
            <template #[`item.user`]="{ item }">
              {{ item.user.firstname }}  {{ item.user.lastname }}
            </template>
            <template #[`item.items`]="{ item }">
              <v-btn color="success" @click="loadOrderData(item)">
                View Order
              </v-btn>
            </template>
            <template #[`item.subtotal`]="{ item }">
              ₱{{ item.subtotal }}
            </template>
            <template #[`item.actions`]="{ item }">
              <v-btn v-if="tab == 'waiting'" color="info" @click="moveToInProgress(item._id)">
                Set as In Progress
              </v-btn>
              <v-btn v-if="tab === 'inprogress'" color="accent" @click="moveToConfirm(item._id, item.user._id)">
                Notify User for Pickup
              </v-btn>
              <v-btn v-if="tab == 'confirmation'" color="primary" @click="openConfirmationDialog(item)">
                Complete Order
              </v-btn>
              <v-btn v-if="(tab == 'completed' || tab == 'cancelled') && !$cookies.get('admin').isstandard" color="error" @click="moveToArchive(item)">
                Archive This
              </v-btn>
              <v-btn v-if="(tab != 'completed' && tab != 'cancelled') && !$cookies.get('admin').isstandard" color="error" @click="cancelOrder(item._id)">
                Cancel Order
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Order Details -->
    <v-dialog v-model="showOrderDetails" width="500">
      <v-card>
        <v-card-title>Order Details</v-card-title>
        <v-divider />
        <v-container>
          <v-list>
            <v-list-item>
              <v-row>
                <v-col cols="8" class="subtitle-2">
                  Item Name
                </v-col>
                <v-col cols="2" class="subtitle-2">
                  Price
                </v-col>
                <v-col cols="2" class="subtitle-2">
                  Quantity
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item v-for="item in activeOrderItems" :key="item.name">
              <v-row>
                <v-col cols="8">
                  {{ item.name }}
                </v-col>
                <v-col cols="2">
                  <span>&#8369;{{ item.price }}</span>
                </v-col>
                <v-col cols="2">
                  <span>{{ item.quantity }}</span>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="showOrderDetails = false">
              Close
            </v-btn>
            <v-btn v-if="tab === 'waiting'" color="info" @click="moveToInProgress(activeOrder._id)">
              Set as In Progress
            </v-btn>
            <v-btn v-if="tab === 'inprogress'" color="accent" @click="moveToConfirm(activeOrder._id)">
              Notify User for Pickup
            </v-btn>
            <v-btn v-if="tab === 'confirmation'" color="primary" @click="openConfirmationDialog">
              Complete Order
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showConfirmationDialog" width="500">
      <v-alert v-if="qrAlert.show" :type="qrAlert.type">
        {{ qrAlert.message }}
      </v-alert>
      <v-card>
        <div id="reader" />
      </v-card>
      <v-card-actions>
        <v-btn color="error" @click="showConfirmationDialog = false">
          Close
        </v-btn>
        <v-btn :disabled="!showRescanButton" color="info" @click="rescan">
          Scan Again
        </v-btn>
        <v-btn :disabled="disableSubmitComplete" color="success" @click="submitComplete">
          Complete Order
        </v-btn>
      </v-card-actions>
    </v-dialog>
  </v-container>
</template>

<script>
import { Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
import Snackbar from '@/components/Snackbar';

export default {
  name: 'OrderManagement',
  components: {
    Snackbar
  },
  layout: 'admin',
  data () {
    return {
      tab: 'all',
      orderHeaders: [
        { text: 'Name', sortable: true, value: 'user' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Order Information', value: 'items' },
        { text: 'Total', value: 'subtotal' }
      ],
      orderData: [],

      // Dialogs
      showOrderDetails: false,
      activeOrder: {},
      activeOrderItems: [],

      showConfirmationDialog: false,
      qrAlert: {
        show: false,
        type: 'success',
        message: ''
      },
      qrScanner: null,
      disableSubmitComplete: true,

      // Socket
      socket: null
    };
  },
  computed: {
    orderDisplay () {
      let orders = [];
      if (this.tab === 'all') {
        orders = this.orderData.filter(o => o.status !== 'cart');
      } else if (this.tab === 'waiting') {
        orders = this.orderData.filter(o => o.status === 'waiting');
      } else if (this.tab === 'inprogress') {
        orders = this.orderData.filter(o => o.status === 'inprogress');
      } else if (this.tab === 'confirmation') {
        orders = this.orderData.filter(o => o.status === 'confirmation');
      } else if (this.tab === 'completed') {
        orders = this.orderData.filter(o => o.status === 'completed');
      } else if (this.tab === 'cancelled') {
        orders = this.orderData.filter(o => o.status === 'cancelled');
      }
      return orders;
    },
    showRescanButton () {
      return this.qrScanner && this.qrScanner.getState() === Html5QrcodeScannerState.PAUSED;
    }
  },
  watch: {
    tab () {
      if (this.tab !== 'all') {
        if (!this.orderHeaders.some(o => o.text === 'Action')) {
          this.orderHeaders.push({ text: 'Action', value: 'actions', sortable: false });
        }
      } else {
        this.orderHeaders = this.orderHeaders.filter(o => o.text !== 'Action');
      }
    }
  },
  mounted () {
    this.getOrders();
    // Connect to socket.io
    this.socket = this.$nuxtSocket({});
  },
  methods: {
    async getOrders () {
      const { data } = await this.$axios.get('/order');
      this.orderData = data.res;
    },
    loadOrderData (item) {
      this.showOrderDetails = true;
      this.activeOrder = item;
      this.activeOrderItems = [];
      for (const food of item.items) {
        if (this.activeOrderItems.some(o => o.name === food.name)) {
          const index = this.activeOrderItems.map(x => x.name).indexOf(food.name);
          this.activeOrderItems[index].quantity += 1;
        } else {
          this.activeOrderItems.push({ name: food.name, price: food.price, quantity: 1 });
        }
      }
    },
    async moveToInProgress (id) {
      const body = {
        id,
        status: 'inprogress',
        server: this.$cookies.get('admin').id
      };
      const res = await this.$axios.put('/api/order/changestatus', body);
      if (res) {
        this.$refs.Snackbar.show(res.data.res);
        this.getOrders();
        this.showOrderDetails = false;
      }
    },
    async moveToConfirm (id, userid) {
      const body = {
        id,
        status: 'confirmation'
      };
      const res = await this.$axios.put('/api/order/changestatus', body);
      if (res) {
        this.$refs.Snackbar.show(res.data.res);
        this.getOrders();
        this.showOrderDetails = false;
      }

      const text = 'Your order is ready for pickup! Head to the register to claim your order.';
      const title = 'Your Order is Ready!';
      const options = {
        body: text,
        vibrate: [200, 100, 200]
      };

      navigator.serviceWorker.ready.then(function (serviceWorker) {
        serviceWorker.showNotification(title, options);
      });

      this.socket.emit('notification:send', { type: 'ready', id: userid });
    },
    async openConfirmationDialog (itemToOpen = null) {
      this.qrAlert.show = false;
      if (itemToOpen) {
        this.activeOrder = itemToOpen;
      }
      if (this.showOrderDetails) { this.showOrderDetails = false; }
      this.showConfirmationDialog = true;
      await this.$nextTick();
      const html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false);
      html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
      this.qrScanner = html5QrcodeScanner;
    },
    showQRAlert (message, type = 'primary') {
      this.qrAlert.type = type;
      this.qrAlert.message = message;
      this.qrAlert.show = true;
    },
    async onScanSuccess (decodedText, decodedResult) {
      this.qrAlert.show = false;
      try {
        if (!decodedText.includes('infiniscan:')) {
          this.showQRAlert('This code is not an Infiniscan QR code.', 'error');
          this.qrScanner.pause();
        } else {
          const orderID = decodedText.split(':');
          const verifyOrder = await this.$axios.get(`/order/search/${orderID[1]}`);
          if (verifyOrder.data.res) {
            this.showQRAlert('An order has been found under this user!');
            this.qrScanner.pause();
            this.disableSubmitComplete = false;
          }
        }
      } catch (err) {
        this.showQRAlert(err.response.data.message, 'error');
        this.qrScanner.pause();
      }
    },
    onScanFailure () {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      // console.warn(`Code scan error = ${error}`);
    },
    rescan () {
      this.qrAlert.show = false;
      this.disableSubmitComplete = true;
      this.qrScanner.resume();
    },
    async submitComplete () {
      const body = {
        id: this.activeOrder._id
      };
      const res = await this.$axios.put('/api/order/completeorder', body);
      if (res) {
        this.$refs.Snackbar.show(res.data.res);
        this.getOrders();
        this.showConfirmationDialog = false;
      }
    },
    async moveToArchive (item) {
      const res = await this.$axios.delete(`/api/order/archive/${item._id}`);
      if (res) {
        this.$refs.Snackbar.show(res.data.res);
        this.getOrders();
      }
    },
    async cancelOrder (id) {
      const body = {
        id,
        status: 'cancelled'
      };
      const res = await this.$axios.put('/api/order/changestatus', body);
      if (res) {
        this.$refs.Snackbar.show(res.data.res);
        this.getOrders();
        this.showOrderDetails = false;
      }
    }
  }
};
</script>

<style>

</style>
