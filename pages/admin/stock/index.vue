<template>
  <v-container class="px-9">
    <Snackbar ref="Snackbar" />
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Stock Managment
          </h3>
          <div v-if="editMode">
            <v-btn color="error" @click="editMode = false">
              Exit Edit Mode
            </v-btn>
          </div>
          <div v-if="deleteMode">
            <v-btn color="error" @click="deleteMode = false">
              Exit Archive Mode
            </v-btn>
          </div>
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
              {{ item.displayID }}
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
              {{ item.displayID }}
              <CopyToClipboard :text="item._id" @copy="$refs.Snackbar.show('Copied to clipboard!')">
                <a href="javascript:void(0)" class="ml-2">Copy ID</a>
              </CopyToClipboard>
            </template>
            <template #[`item.ingredients`]="{ item }">
              <v-btn color="accent" @click="loadIngredientDialog(item.ingredients)">
                View Ingredients
              </v-btn>
            </template>
            <template #[`item.price`]="{ item }">
              ₱{{ item.price }}
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn color="warning" @click="toggleDialog('edit', item._id)">
                Edit This
              </v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn color="error" @click="toggleDialog('delete', item._id)">
                Archive This
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ingredient view dialog -->
    <v-dialog v-model="ingredientView" width="600">
      <v-card>
        <v-card-title>Item Ingredients</v-card-title>
        <div class="mx-4 mt-4">
          WIP
          <v-card v-for="ingredient in ingredientViewItems" :key="`view-${ingredient._id}`">
            {{ ingredient.name }}
          </v-card>
        </div>
        <v-card-actions>
          <v-btn color="error" outlined @click="ingredientView = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

      <v-btn v-if="tab == 'ingredient'" fab large color="warning" @click="toggleDialog('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-if="tab == 'food'" fab large color="warning" @click="toggleDialog('editMode')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn v-if="tab == 'ingredient'" fab large color="error" @click="toggleDialog('delete')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn v-if="tab == 'food'" fab large color="error" @click="toggleDialog('deleteMode')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <!-- Dialogs -->
    <IngredientDialogs v-if="tab == 'ingredient'" :show-dialog="showDialog" :type="dialogType" @hideDialog="hideDialog" @updateTable="getIngredients" />
    <FoodDialogs
      v-if="tab == 'food'"
      ref="FoodDialogs"
      :show-dialog="showDialog"
      :type="dialogType"
      @hide-dialog="hideDialog"
      @update-table="getFood"
    />
  </v-container>
</template>

<script>
import CopyToClipboard from 'vue-copy-to-clipboard';
import Snackbar from '@/components/Snackbar';
import IngredientDialogs from '@/components/stock/IngredientDialogs';
import FoodDialogs from '@/components/stock/FoodDialogs';

export default {
  name: 'StockModule',
  components: {
    Snackbar,
    IngredientDialogs,
    FoodDialogs,
    CopyToClipboard
  },
  layout: 'admin',
  data () {
    return {
      tab: 'ingredient',
      fab: false,
      showDialog: false,
      dialogType: '',
      editMode: false,
      deleteMode: false,
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
          { text: 'Name', sortable: true, value: 'name' },
          { text: 'Type', sortable: true, value: 'type' },
          { text: 'Ingredients', sortable: false, value: 'ingredients' },
          { text: 'Price', sortable: true, value: 'price' }
        ],
        table: []
      },
      // Ingedient view dialog
      ingredientView: false,
      ingredientViewItems: []
    };
  },
  head () {
    return {
      title: 'Stock Management'
    };
  },
  watch: {
    tab () {
      this.editMode = false;
      this.deleteMode = false;
    },
    ingredientView () {
      if (!this.ingredientView) {
        this.ingredientViewItems = [];
      }
    },
    editMode () {
      if (this.editMode) {
        this.foodTable.headers.push({
          text: 'Edit',
          sortable: false,
          value: 'edit'
        });
      } else {
        this.foodTable.headers.pop();
      }
    },
    deleteMode () {
      if (this.deleteMode) {
        this.foodTable.headers.push({
          text: 'Archive',
          sortable: false,
          value: 'delete'
        });
      } else {
        this.foodTable.headers.pop();
      }
    }
  },
  mounted () {
    this.getIngredients();
    this.getFood();
  },
  methods: {
    toggleDialog (type = '', id) {
      if (this.tab === 'ingredient') {
        // Ensures that the prop is set to false to trigger the change
        this.showDialog = false;
        this.showDialog = true;
        this.dialogType = type;
      }
      if (this.tab === 'food') {
        if (type === 'add') {
          this.showDialog = false;
          this.showDialog = true;
          this.dialogType = type;
        }
        if (type === 'editMode') {
          this.editMode = true;
        }
        if (type === 'deleteMode') {
          this.deleteMode = true;
        }
        if (type === 'edit' || type === 'delete') {
          this.showDialog = false;
          this.showDialog = true;
          this.dialogType = type;
          this.$refs.FoodDialogs.id = id;
        }
      }
    },
    hideDialog () {
      this.showDialog = false;
      this.dialogType = '';
    },
    async getIngredients () {
      const res = await this.$axios.get('/api/ingredient/');
      this.ingredientTable.table = res.data.res;
    },
    async getFood () {
      const res = await this.$axios.get('/api/food/');
      this.foodTable.table = res.data.res;
    },
    async loadIngredientDialog (ingredients) {
      for (const item of ingredients) {
        const res = await this.$axios.get(`/api/ingredient/${item}`);
        if (res.status === 200) {
          this.ingredientViewItems.push(res.data.res);
        }
      }
      this.ingredientView = true;
    }
  }
};
</script>

<style>

</style>
