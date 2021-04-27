<template>
  <v-container fill-height class="px-9">
    <v-row>
      <!-- Orders -->
      <v-col>
        <v-card class="pa-4 order-card">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Orders
          </h3>
          <v-divider />
          <div class="d-flex flex-column">
            <OrderView v-for="i in 10" :key="i" :test="true" :test-type="i % 3" class="order-view" />
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
  head () {
    return {
      title: 'Dashboard'
    };
  }
};
</script>

<style>
</style>
