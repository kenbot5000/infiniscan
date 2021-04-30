<template>
  <v-container class="px-9">
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Stock Managment
          </h3>
          <v-tabs>
            <v-tab>Ingredients</v-tab>
            <v-tab>Food Items</v-tab>
          </v-tabs>
          <v-divider />
          <v-data-table
            :headers="headers"
            :items="stockTable"
            :search="ingredientSearch"
          >
            <template #top>
              <v-text-field v-model="ingredientSearch" label="Search" class="mx-4" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Speed dial for dialogs -->
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      open-on-hover
      transition="scale-transition"
      absolute
    >
      <template #activator>
        <v-btn v-model="fab" color="success" dark fab x-large>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-clipboard-edit-outline
          </v-icon>
        </v-btn>
      </template>

      <v-btn fab large color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn fab large color="warning">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn fab large color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      fab: false,
      ingredientSearch: '',
      headers: [
        { text: 'ID', sortable: true, value: 'id' },
        { text: 'Name', sortable: true, filterable: true, value: 'name' },
        { text: 'Serving Size', sortable: false, value: 'serving' },
        { text: 'Item Type', sortable: true, filterable: true, value: 'type' },
        { text: 'Stock', sortable: true, value: 'stock' }
      ],
      stockTable: [
        { id: 1, name: 'Choco Powder', serving: '100g', type: 'powder', stock: 7 },
        { id: 2, name: 'Cream Cheese Powder', serving: '100g', type: 'powder', stock: 10 },
        { id: 3, name: 'Lychee Syrup', serving: '50mL', type: 'syrup', stock: 5 },
        { id: 4, name: 'Simple Syrup', serving: '25mL', type: 'sweetener', stock: 18 },
        { id: 5, name: 'Strawberry Syrup', serving: '50mL', type: 'syrup', stock: 0 },
        { id: 6, name: 'Lychee Bursts', serving: '100g', type: 'pearl', stock: 20 },
        { id: 7, name: 'Boba Pearl', serving: '150g', type: 'pearl', stock: 25 }
      ]
    };
  },
  head () {
    return {
      title: 'Stock Management'
    };
  }
};
</script>

<style>

</style>
