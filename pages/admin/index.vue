<template>
  <v-container class="px-9 mt-4">
    <v-row>
      <!-- Orders -->
      <v-col>
        <v-card class="pa-4 order-card">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Order Queue
          </h3>
          <v-divider />
          <div class="d-flex flex-column">
            <!-- Confirm Order Dialog -->
            <v-dialog v-model="acceptOrderDialog" width="500">
              <v-card>
                <v-card-title>Accept Order?</v-card-title>
                <v-divider />
                <v-card-text class="mt-4">
                  Are you sure you want to accept this order? This will consume stock from your inventory.
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="error" @click="acceptOrderDialog = false">
                    Close
                  </v-btn>
                  <v-btn color="primary" @click="confirmOrder">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <OrderView v-for="(item, i) of orders" :key="i" :content="item" class="order-view" @show-accept="showAcceptOrderDialog" />
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Stock
          </h3>
          <v-divider />
          <StockView />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderView from '@/components/OrderView';
import StockView from '@/components/StockView';

export default {
  name: 'AdminDashboard',
  components: {
    OrderView,
    StockView
  },
  layout: 'admin',
  data () {
    return {
      orders: [],
      acceptOrderDialog: false,
      activeOrder: {}
    };
  },
  head () {
    return {
      title: 'Dashboard'
    };
  },
  async mounted () {
    const res = await this.$axios.get('/order/list?status=waiting');
    this.orders = res.data.res;
  },
  methods: {
    showAcceptOrderDialog (order) {
      this.acceptOrderDialog = true;
      this.activeOrder = order;
    }
  }
};
</script>

<style>
</style>
