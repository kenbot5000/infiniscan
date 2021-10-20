<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title><h2>Your Order</h2></v-card-title>
      <!-- Order Cart -->
      <v-card-text v-if="foodItemDisplay.length == 0 && (orderData.status == 'cart' || orderData.status == 'none')">
        Your cart is currently empty. Add something to your cart!
      </v-card-text>
      <v-row v-if="orderData.status == 'cart'" class="d-flex flex-column">
        <v-col v-for="item in foodItemDisplay" :key="item._id">
          <v-card-actions>
            <v-row class="d-flex justify-space-between">
              <v-col class="pt-4">
                <div>
                  {{ item.name }}
                </div>
              </v-col>
              <v-col cols="2" class="pt-4">
                &#8369;{{ item.price }}
              </v-col>
              <v-col cols="1" class="pt-4">
                {{ item.count }}
              </v-col>
              <v-col cols="4">
                <v-btn-toggle>
                  <v-btn @click="addItem(item._id)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn @click="removeItem(item._id)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>

      <!-- Order In Progress -->
      <v-card-text v-if="orderData.status == 'inprogress'">
        Your order is currently being processed. Please wait one moment...
      </v-card-text>
      <v-row v-if="orderData.status == 'inprogress'" class="d-flex flex-column">
        <v-col v-for="item in foodItemDisplay" :key="item._id">
          <v-card-actions>
            <v-row class="d-flex justify-space-between">
              <v-col class="pt-4">
                <div>
                  {{ item.name }}
                </div>
              </v-col>
              <v-col cols="2" class="pt-4">
                &#8369;{{ item.price }}
              </v-col>
              <v-col cols="2" class="pt-4">
                {{ item.count }}
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'UserOrder',
  layout: 'user',
  data () {
    return {
      orderData: {
        status: 'none'
      }
    };
  },
  computed: {
    foodItemDisplay () {
      const foodData = [];
      if (this.orderData && this.orderData.items) {
        for (const food of this.orderData.items) {
          const existingItem = foodData.find(o => o.name === food.name);
          if (!existingItem) {
            foodData.push({ ...food, count: 1 });
          } else {
            existingItem.count += 1;
          }
        }
      }
      return foodData;
    }
  },
  async mounted () {
    const userID = this.$cookies.get('user');
    const { data } = await this.$axios.get(`/api/order?user=${userID.id}&active=true`);
    if (data.res[0]) {
      this.orderData = data.res[0];
    }
  },
  methods: {
    async addItem (itemID) {
      const body = {
        id: this.$cookies.get('user').id,
        foodID: itemID
      };
      const { data } = await this.$axios.post('/api/order/', body);
      if (data.res) {
        this.refreshCart();
      }
    },
    async removeItem (itemID) {
      const body = {
        id: this.$cookies.get('user').id,
        foodID: itemID
      };
      const { data } = await this.$axios.put('/api/order/', body);
      if (data.res) {
        this.refreshCart();
      }
    },
    async refreshCart () {
      const userID = this.$cookies.get('user');
      const { data } = await this.$axios.get(`/api/order?user=${userID.id}&active=true`);
      this.orderData = data.res[0];
    }
  }
};
</script>

<style>

</style>
