<template>
  <v-card class="mt-4">
    <v-container>
      <h3>Receipt</h3>
      <v-card outlined>
        <v-card-title>
          Order
        </v-card-title>
        <v-card-subtitle>
          {{ order._id }}
        </v-card-subtitle>
        <v-card-text>
          <p>Status: {{ order.status }}</p>
        </v-card-text>
        <v-divider />
        <v-row class="px-4 mt-3">
          <v-col><h4>Items</h4></v-col>
        </v-row>
        <v-card-actions class="px-4">
          <v-row v-for="item in format(order.items)" :key="item._id">
            <v-col class="caption">
              {{ item.name }}
            </v-col>
            <v-col>
              {{ item.count }}
            </v-col>
            <v-col>
              &#8369;{{ item.price }}
            </v-col>
          </v-row>
        </v-card-actions>
        <v-divider />
        <v-container fluid>
          <b>Total:</b> &#8369;{{ order.subtotal }}
        </v-container>
      </v-card>
      <v-divider />
      <h3>Order Feedback</h3>
      <v-textarea v-model="orderFeedback" />
    </v-container>

    <v-card-actions>
      <v-btn color="primary" @click="submitFeedback">
        Submit Feedback
      </v-btn>
      <v-btn color="error" @click="$emit('close-receipt')">
        No Thanks
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      orderFeedback: ''
    };
  },
  methods: {
    format (orderData) {
      const foodData = [];
      for (const food of orderData) {
        const existingItem = foodData.find(o => o.name === food.name);
        if (!existingItem) {
          foodData.push({ ...food, count: 1 });
        } else {
          existingItem.count = +1;
        }
      }
      return foodData;
    },
    async submitFeedback () {
      const body = {
        feedback: this.orderFeedback,
        order: this.order
      };
      const { data } = await this.$axios.post('/api/feedback', body);
      if (data) {
        this.$emit('snackbar');
        this.$emit('close-receipt');
      }
    }
  }
};
</script>

<style>

</style>
