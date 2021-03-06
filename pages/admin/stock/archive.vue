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
            <template #[`item.edit`]="{ item }">
              <v-btn color="warning" @click="showArchiveStockDialog('restore', item)">
                Restore
              </v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn color="error" @click="showArchiveStockDialog('delete', item)">
                Delete
              </v-btn>
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
            <template #[`item.ingredients`]="{ item }">
              <span class="text-subtitle-2 text--secondary">{{ item.ingredients.length }} Ingredients </span>
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn color="warning" @click="showArchiveStockDialog('restore', item)">
                Restore
              </v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn color="error" @click="showArchiveStockDialog('delete', item)">
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialogs -->
    <v-dialog v-model="dialog.show" width="600">
      <v-card class="pb-3">
        <v-card-title>
          <span v-if="dialog.type == 'restore'">Restore this Item?</span>
          <span v-if="dialog.type == 'delete'">Delete this Item?</span>
        </v-card-title>
        <v-card-subtitle>
          <span v-if="dialog.type == 'restore'">You may need to change the item's name if it already exists.</span>
          <span v-if="dialog.type == 'delete'">This item will be gone forever.</span>
        </v-card-subtitle>
        <v-form class="px-4">
          <v-text-field v-model="dialog.id" filled label="ID" readonly />
          <v-text-field v-model="dialog.name" filled label="Name" readonly />
        </v-form>
        <v-card-actions>
          <v-btn v-if="dialog.type == 'restore'" color="primary" @click="restoreItem">
            Restore
          </v-btn>
          <v-btn v-if="dialog.type == 'delete'" color="error" @click="deleteItem">
            Delete
          </v-btn>
          <v-btn color="error" outlined @click="dialog.show = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Snackbar from '@/components/Snackbar';

export default {
  components: {
    Snackbar
  },
  layout: 'admin',
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
      },
      foodTable: {
        search: '',
        headers: [
          { text: 'ID', sortable: true, value: '_id' },
          { text: 'Name', sortable: true, filterable: true, value: 'name' },
          { text: 'Type', sortable: true, filterable: true, value: 'type' },
          { text: 'Ingredients', sortable: false, value: 'ingredients' },
          { text: 'Price', sortable: false, value: 'price' }
        ],
        table: []
      },
      restoreDialog: false,
      dialog: {
        show: false,
        type: '',
        id: '',
        name: ''
      }
    };
  },
  head () {
    return {
      title: 'Stock Archive'
    };
  },
  mounted () {
    this.getIngredientArchive();
    this.getFoodArchive();
    if (!this.$cookies.get('admin').isstandard) {
      this.ingredientTable.headers.push({ text: 'Actions', sortable: false, value: 'edit' });
      this.ingredientTable.headers.push({ text: '', sortable: false, value: 'delete' });
      this.foodTable.headers.push({ text: 'Actions', sortable: false, value: 'edit' });
      this.foodTable.headers.push({ text: '', sortable: false, value: 'delete' });
    }
  },
  methods: {
    async getIngredientArchive () {
      const res = await this.$axios.get('/api/archive/ingredient');
      this.ingredientTable.table = res.data.res;
    },
    async getFoodArchive () {
      const res = await this.$axios.get('/api/archive/food');
      this.foodTable.table = res.data.res;
    },
    showArchiveStockDialog (type, item) {
      this.dialog = {
        show: true,
        id: item._id,
        type,
        name: item.name
      };
    },
    async restoreItem () {
      const res = await this.$axios.post(`/api/archive/${this.tab}/${this.dialog.id}/restore`);
      if (res.status === 200) {
        this.$refs.Snackbar.show(res.data.res);
        this.getIngredientArchive();
        this.getFoodArchive();
        this.dialog.show = false;
      }
    },
    async deleteItem () {
      const res = await this.$axios.delete(`/api/archive/${this.tab}/${this.dialog.id}/delete`);
      if (res.status === 200) {
        this.$refs.Snackbar.show(res.data.res);
        this.getIngredientArchive();
        this.getFoodArchive();
        this.dialog.show = false;
      }
    }
  }
};
</script>

<style>

</style>
