<template>
  <v-container fluid>
    <v-card>
      <v-card-title><h2>Order History</h2></v-card-title>
      <v-card-actions>
        <v-data-iterator :items="history">
          <template #default="{items}">
            <v-row v-for="order in items" :key="order._id">
              <v-col>
                <v-card outlined>
                  <v-card-title>
                    Order
                  </v-card-title>
                  <v-card-subtitle>
                    {{ order._id }}
                  </v-card-subtitle>
                  <v-card-text>
                    <p>Note: To be converted to a more user-friendly format in a future update</p>
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
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'UserHistory',
  layout: 'user',
  data () {
    return {
      history: []
    };
  },
  async mounted () {
    const res = await this.$axios.get(`/order/?user=${this.$cookies.get('user').id}`);
    this.history = res.data.res;
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
    }
  }
};
</script>

<style>

</style>
