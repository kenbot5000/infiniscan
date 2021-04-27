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
              <tr v-for="item in stockData" :key="item.id">
                <td>{{ item.id }}</td>
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
      stockData: [
        { id: 1, name: 'Choco Powder', serving: '100g', stock: 7 },
        { id: 2, name: 'Cream Cheese Powder', serving: '100g', stock: 10 },
        { id: 3, name: 'Lychee Syrup', serving: '50mL', stock: 5 },
        { id: 4, name: 'Simple Syrup', serving: '25mL', stock: 18 },
        { id: 5, name: 'Strawberry Syrup', serving: '50mL', stock: 0 }
      ]
    };
  },
  methods: {
    sortBy (type = 'id') {
      switch (type) {
        case 'id' :
          this.stockData.sort((a, b) => {
            return a.id - b.id;
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
