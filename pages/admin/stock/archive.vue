<template>
  <v-container class="px-9">
    <Snackbar ref="Snackbar" />
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Stock Archive
          </h3>
          <v-tabs>
            <v-tab @click="tab = 'ingredient'" />
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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

import Snackbar from '@/components/Snackbar';

export default {
  components: {
    Snackbar
  },
  data () {
    return {
      tab: 'ingredient',
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
      }
    };
  },
  mounted () {
    this.getIngredientArchive();
  },
  methods: {
    async getIngredientArchive () {
      const res = await axios.get('/api/archive/ingredient');
      this.ingredientTable.table = res.data.res;
    }
  }
};
</script>

<style>

</style>
