<template>
  <v-container fill-height class="px-9">
    <v-row>
      <!-- Orders -->
      <v-col>
        <v-card class="pa-4 order-card">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Order Queue
          </h3>
          <v-divider />
          <div class="d-flex flex-column">
            <OrderView v-for="(item, i) of orders" :key="i" :content="item" class="order-view" />
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
  components: {
    OrderView,
    StockView
  },
  layout: 'admin',
  data () {
    return {
      orders: []
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
  }
};
</script>

<style>
</style>
