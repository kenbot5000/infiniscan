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
              <v-sparkline
                padding="20"
                :auto-line-width="true"
                width="500"
                :labels="earningsLabels"
                :show-labels="true"
                :value="earningsData"
                stroke-linecap="round"
                auto-draw
              />
            </v-card>

            <v-card outlined class="pa-4 mt-4">
              <h4 class="text-h4">
                Total: ₱{{ totalEarnings }}
              </h4>
            </v-card>

            <!-- Table -->
            <v-card outlined class="pt-4 px-5 mt-4">
              <v-data-table :headers="orderHeaders" :items="sortedOrderData">
                <template #[`item.subtotal`]="{ item }">
                  ₱{{ item.subtotal }}
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
export default {
  name: 'ReportManagement',
  layout: 'admin',
  data () {
    return {
      orderData: [],
      orderHeaders: [
        { value: 'user', text: 'Sold To' },
        { value: 'subtotal', text: 'Subtotal' },
        { value: 'server', text: 'Served by' },
        { value: 'created', text: 'Date' }
      ]
    };
  },
  computed: {
    sortedOrderData () {
      let data = this.orderData.filter(o => o.created);
      data.sort((a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);
        return date1 - date2;
      });
      data = data.map((o) => {
        o.user = `${o.user.firstname} ${o.user.lastname}`;
        o.server = o.server ? `${o.server.firstname} ${o.server.lastname}` : '-';

        const d = new Date(o.created);
        o.created = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

        return o;
      });
      return data;
    },
    earningsData () {
      let data = this.orderData.filter(o => o.created);
      data.sort((a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);
        return date1 - date2;
      });
      data = data.map(item => item.subtotal);
      return data;
    },
    earningsLabels () {
      let data = this.orderData.filter(o => o.created);
      data.sort((a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);
        return date1 - date2;
      });
      data = data.map((item) => {
        return item.created;
        // const prop = item.created;
        // const d = new Date(prop);
        // return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
      });
      return data;
    },
    totalEarnings () {
      let total = 0;
      for (const item of this.orderData) {
        total += item.subtotal;
      }
      return total;
    }
  },
  mounted () {
    this.getOrders();
  },
  methods: {
    async getOrders () {
      const res = await this.$axios.get('/order/list?status=completed');
      this.orderData = res.data.res;
    }
  }
};
</script>

<style>

</style>
