<template>
  <v-container class="px-9">
    <Snackbar ref="Snackbar" />
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
            <template #[`item._id`]="{ item }">
              {{ item._id }}
              <CopyToClipboard :text="item._id" @copy="$refs.Snackbar.show('Copied to clipboard!')">
                <a href="javascript:void(0)" class="ml-2">Copy ID</a>
              </CopyToClipboard>
            </template>
          </v-data-table>
          <v-data-table
            v-if="tab == 'food'"
            :headers="foodTable.headers"
            :items="foodTable.table"
            :search="foodTable.search"
          >
            <template #top>
              <v-text-field v-model="foodTable.search" label="Search" class="mx-4" />
            </template>
            <template #[`item._id`]="{ item }">
              {{ item._id }}
              <CopyToClipboard :text="item._id" @copy="$refs.Snackbar.show('Copied to clipboard!')">
                <a href="javascript:void(0)" class="ml-2">Copy ID</a>
              </CopyToClipboard>
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

      <v-btn fab large color="warning" @click="toggleDialog('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn fab large color="error" @click="toggleDialog('delete')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <!-- Dialogs -->
    <IngredientDialogs v-if="tab == 'ingredient'" :show-dialog="showDialog" :type="dialogType" @hideDialog="hideDialog" @updateTable="getIngredients" />
    <FoodDialogs v-if="tab == 'food'" :show-dialog="showDialog" :type="dialogType" @hide-dialog="hideDialog" @update-table="getFood" />
  </v-container>
</template>

<script>
import axios from 'axios';

import Snackbar from '@/components/Snackbar';
import IngredientDialogs from '@/components/stock/IngredientDialogs';
import FoodDialogs from '@/components/stock/FoodDialogs';
import CopyToClipboard from 'vue-copy-to-clipboard';

export default {
  name: 'StockModule',
  components: {
    Snackbar,
    IngredientDialogs,
    FoodDialogs,
    CopyToClipboard
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
          { text: 'ID', sortable: true, value: '_id' },
          { text: 'Name', sortable: true, filterable: true, value: 'name' },
          { text: 'Serving Size', sortable: false, value: 'serving' },
          { text: 'Item Type', sortable: true, filterable: true, value: 'itemtype' },
          { text: 'Stock', sortable: true, value: 'stock' }
        ],
        table: []
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
  mounted () {
    this.getIngredients();
    this.getFood();
  },
  methods: {
    toggleDialog (type = '') {
      // Ensures that the prop is set to false to trigger the change
      this.showDialog = false;
      this.showDialog = true;
      this.dialogType = type;
    },
    hideDialog () {
      this.showDialog = false;
      this.dialogType = '';
    },
    async getIngredients () {
      const res = await axios.get('/api/ingredient/');
      this.ingredientTable.table = res.data.res;
    },
    async getFood () {
      const res = await axios.get('/api/food/');
      this.foodTable.table = res.data.res;
    }
  }
};
</script>

<style>

</style>
