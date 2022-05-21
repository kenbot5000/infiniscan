<template>
  <v-container class="px-9 mt-4">
    <v-row>
      <v-col>
        <v-card outlined class="pa-3">
          <v-row>
            <v-col>
              <h3 class="text-h3 ml-4 mt-2 mb-2">
                Customer Feedback
              </h3>
              <v-data-table :headers="userHeaders" :items="items" :search="search">
                <template #top>
                  <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                  />
                </template>
                <template #[`item.date`]="{ item }">
                  {{ formatDateForDisplay(item.created) }}
                </template>
                <template #[`item.user`]="{ item }">
                  {{ item.user.firstname }}  {{ item.user.lastname }}
                </template>
                <template #[`item.order`]="{ item }">
                  <v-btn color="primary" @click="openOrderDialog(item.order)">
                    View Order
                  </v-btn>
                </template>
              </v-data-table>

              <v-dialog v-model="showDialog" width="500px">
                <v-card class="pb-4">
                  <v-card-title class="text-h5">
                    Order Data
                  </v-card-title>
                  <v-form class="mt-4 mx-4">
                    <v-card-subtitle>
                      {{ selectedRow._id }}
                    </v-card-subtitle>
                    <v-card-text>
                      <p>Status: {{ selectedRow.status }}</p>
                    </v-card-text>
                    <v-divider />
                    <v-row class="px-4 mt-3">
                      <v-col><h4>Items</h4></v-col>
                    </v-row>
                    <v-card-actions v-if="selectedRow.items" class="px-4">
                      <v-row v-for="item in format(selectedRow.items)" :key="item._id">
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
                      <b>Total:</b> &#8369;{{ selectedRow.subtotal }}
                    </v-container>
                  </v-form>
                  <v-card-actions>
                    <v-btn color="error" @click="showDialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'CustomerManagement',
  layout: 'admin',
  data () {
    return {
      userHeaders: [
        { text: 'ID', value: '_id' },
        { text: 'Date', value: 'date' },
        { text: 'User', value: 'user' },
        { text: 'Order', value: 'order' },
        { text: 'Feedback', value: 'feedback' }
      ],
      items: [],
      search: '',
      showDialog: false,
      selectedRow: {}
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/feedback');
    this.items = data.res;
  },
  methods: {
    openOrderDialog (row) {
      this.selectedRow = row;
      this.showDialog = true;
    },
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
