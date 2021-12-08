<template>
  <v-container class="px-9">
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Reports
          </h3>
          <v-container class="mt-3">
            <v-card outlined class="pt-4 px-5">
              <!-- Total Earnings -->
              <h4 class="text-h4">
                Your Total Earnings
              </h4>
              <OrderChart :height="100" />
            </v-card>

            <v-card outlined class="pa-4 mt-4">
              <h4 class="text-h4">
                Total: ₱{{ totalEarnings }}
              </h4>
            </v-card>

            <!-- Table -->
            <v-card outlined class="pt-4 px-5 mt-4">
              <v-data-table :headers="orderHeaders" :items="orderData">
                <template #[`item.user`]="{ item }">
                  {{ item.user.firstname }} {{ item.user.lastname }}
                </template>
                <template #[`item.subtotal`]="{ item }">
                  ₱{{ item.subtotal }}
                </template>
                <template #[`item.server`]="{ item }">
                  <span v-if="item.server">{{ item.server.firstname }}  {{ item.server.lastname }}</span>
                </template>
                <template #[`item.created`]="{ item }">
                  {{ formatDateForDisplay(item.created) }}
                </template>
              </v-data-table>
            </v-card>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Moment from 'moment';
import OrderChart from '@/components/charts/OrderChart';

export default {
  name: 'ReportManagement',
  components: {
    OrderChart
  },
  layout: 'admin',
  data () {
    return {
      orderData: [],
      orderHeaders: [
        { value: 'user', text: 'Sold To' },
        { value: 'subtotal', text: 'Subtotal' },
        { value: 'server', text: 'Served by' },
        { value: 'created', text: 'Date' }
      ],
      totalEarnings: 0
    };
  },
  mounted () {
    this.getOrders();
  },
  methods: {
    async getOrders () {
      const res = await this.$axios.get('/order/list?status=completed');
      this.orderData = res.data.res;
      this.orderData.sort((a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);
        return date1 - date2;
      });
      const labelsArray = [];
      const totalsArray = [];
      for (const order of this.orderData) {
        this.totalEarnings += order.subtotal;
        const label = new Moment(order.created).format('MM-DD-YYYY');
        labelsArray.push(label);
        totalsArray.push(order.subtotal);
      }
    },
    formatDateForDisplay (date) {
      if (!date) { return '-'; } else {
        return new Moment(date).format('MM-DD-YYYY');
      }
    }
  }
};
</script>

<style>

</style>
