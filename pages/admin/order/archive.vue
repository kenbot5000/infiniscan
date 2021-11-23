<template>
  <v-container class="px-9">
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Order Archive
          </h3>
          <v-divider />
          <v-data-table :headers="orderHeaders" :items="orderData">
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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

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
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'OrderArchive',
  layout: 'admin',
  data () {
    return {
      orderHeaders: [
        { text: 'Name', sortable: true, value: 'user' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Order Information', value: 'items' },
        { text: 'Total', value: 'subtotal' }
      ],
      orderData: [],

      showOrderDetails: false,
      activeOrder: {},
      activeOrderItems: []
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/order/archive');
    this.orderData = data.res;
  },
  methods: {
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
    }
  }
};
</script>

<style>

</style>
