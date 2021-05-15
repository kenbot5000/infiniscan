<template>
  <v-container class="px-9">
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Stock Managment
          </h3>
          <v-tabs>
            <v-tab @click="tab = 'ingredient'">
              Ingredients
            </v-tab>
            <v-tab @click="tab = 'food'">
              Food Items
            </v-tab>
          </v-tabs>
          <v-divider />
          <v-data-table
            v-if="tab == 'ingredient'"
            :headers="ingredientTable.headers"
            :items="ingredientTable.table"
            :search="ingredientTable.search"
          >
            <template #top>
              <v-text-field v-model="ingredientTable.search" label="Search" class="mx-4" />
            </template>
            <template #[`item.id`]="{ item }">
              {{ item.id }} <a href="javascript:void(0)" class="ml-2" @click="copyID(item.id)">Copy ID</a>
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

      <v-btn fab large color="primary" @click="toggleDialog('add')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn fab large color="warning">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn fab large color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <!-- Dialogs -->
    <IngredientDialogs v-if="tab == 'ingredient'" :show-dialog="showDialog" :type="dialogType" @hideDialog="hideDialog" />
  </v-container>
</template>

<script>
import IngredientDialogs from '@/components/stock/IngredientDialogs';

export default {
  name: 'StockModule',
  components: {
    IngredientDialogs
  },
  data () {
    return {
      tab: 'ingredient',
      fab: false,
      showDialog: false,
      dialogType: '',
      ingredientTable: {
        search: '',
        headers: [
          { text: 'ID', sortable: true, value: 'id' },
          { text: 'Name', sortable: true, filterable: true, value: 'name' },
          { text: 'Serving Size', sortable: false, value: 'serving' },
          { text: 'Item Type', sortable: true, filterable: true, value: 'type' },
          { text: 'Stock', sortable: true, value: 'stock' }
        ],
        table: [
          { id: 1, name: 'Choco Powder', serving: '100g', type: 'powder', stock: 7 },
          { id: 2, name: 'Cream Cheese Powder', serving: '100g', type: 'powder', stock: 10 },
          { id: 3, name: 'Lychee Syrup', serving: '50mL', type: 'syrup', stock: 5 },
          { id: 4, name: 'Simple Syrup', serving: '25mL', type: 'sweetener', stock: 18 },
          { id: 5, name: 'Strawberry Syrup', serving: '50mL', type: 'syrup', stock: 0 },
          { id: 6, name: 'Lychee Bursts', serving: '100g', type: 'pearl', stock: 20 },
          { id: 7, name: 'Boba Pearl', serving: '150g', type: 'pearl', stock: 25 }
        ]
      },
      foodTable: {
        headers: [
          { text: 'ID', sortable: true, value: '_id' },
          { text: 'Name', sortable: true, value: 'type' },
          { text: 'Ingredients', sortable: false, value: 'ingredients' },
          { text: 'Price', sortable: true, value: 'price' }
        ],
        table: []
      }
    };
  },
  head () {
    return {
      title: 'Stock Management'
    };
  },
  methods: {
    copyID (id) {
      // Copy to clipboard
    },
    toggleDialog (type = '') {
      // Ensures that the prop is set to false to trigger the change
      this.showDialog = false;
      this.showDialog = true;
      this.dialogType = type;
    },
    hideDialog () {
      this.showDialog = false;
      this.dialogType = '';
    }

  }
};
</script>

<style>

</style>
