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
  </v-container>
</template>

<script>
export default {
  name: 'OrderManagement',
  data () {
    return {
      tab: 'all',
      orderHeaders: [
        { text: 'Name', sortable: true, value: 'user' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Order Information', value: 'items' },
        { text: 'Total', value: 'subtotal' }
      ],
      orderData: []
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
    }
  },
  async mounted () {
    const { data } = await this.$axios.get('/order');
    this.orderData = data.res;
  },
  methods: {
    loadOrderData (item) {

    }
  }
};
</script>

<style>

</style>
