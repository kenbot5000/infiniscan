<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <h4 class="text-h6">
          Sort by
        </h4>
        <v-spacer />
        <v-btn color="success" plain @click="sortBy('id')">
          Default
        </v-btn>
        <v-btn color="success" plain @click="sortBy('stock')">
          Lowest first
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table dense>
          <template #default>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Serving Size</th>
                <th>Servings Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in stockData" :key="item._id">
                <td>{{ item.displayID }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.serving }}</td>
                <td v-if="item.stock > 0">
                  {{ item.stock }}
                </td>
                <td v-else>
                  <v-chip color="error" small>
                    OUT OF STOCK
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      stockData: []
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/api/ingredient');
    this.stockData = data.res;
    this.stockData.sort((a, b) => {
      if (typeof a.displayID === 'undefined' && typeof b.displayID === 'undefined') { return 0; }
      if (typeof a.displayID === 'undefined') { return 1; }
      if (typeof b.displayID === 'undefined') { return -1; }
      return a.displayID - b.displayID;
    });
  },
  methods: {
    sortBy (type = 'id') {
      switch (type) {
        case 'id' :
          this.stockData.sort((a, b) => {
            if (typeof a.displayID === 'undefined' && typeof b.displayID === 'undefined') { return 0; }
            if (typeof a.displayID === 'undefined') { return 1; }
            if (typeof b.displayID === 'undefined') { return -1; }
            return a.displayID - b.displayID;
          });
          break;
        case 'stock' :
          this.stockData.sort((a, b) => {
            return a.stock - b.stock;
          });
      }
    }
  }
};
</script>

<style>

</style>
