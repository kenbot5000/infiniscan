<template>
  <v-container>
    <Snackbar ref="Snackbar" />
    <v-dialog v-model="addDialog" width="600">
      <v-card class="pb-3">
        <v-card-title class="text-h5">
          Add Food Item
        </v-card-title>
        <v-alert v-if="alert.show" :type="alert.type">
          {{ alert.message }}
        </v-alert>
        <v-form class="mt-4 mx-4">
          <v-text-field v-model="name" label="Name" outlined />
          <v-select v-model="itemtype" :items="itemtypes" label="Item Category" outlined />
          <v-text-field v-if="itemtype == 'Other'" v-model="other" label="New Category" placeholder="(Case sensitive)" outlined />
          <v-btn color="secondary" @click="showAddIngredient = true">
            Add Ingredient
          </v-btn>
          <!-- Add ingredient Dialog -->
          <v-dialog v-model="showAddIngredient" width="600">
            <v-card class="pb-3">
              <v-card-title>Add Ingredient to Food Item</v-card-title>
              <v-form class="mt-4 mx-4">
                <v-text-field v-model.lazy="searchIngredient" outlined label="Search Ingredient by Name" />
                <div>
                  <v-card v-if="searchResults.length == 0" outlined>
                    <v-card-title class="text-h6">
                      Type in the name of the ingredient to search!
                    </v-card-title>
                  </v-card>
                  <v-data-iterator v-else :items="searchResults" :items-per-page="4" item-key="_id">
                    <template #default="{ items }">
                      <v-card v-for="item in items" :key="item._id" outlined class="pa-2 my-2">
                        <v-row>
                          <v-col>
                            <b class="text-h6">{{ item.name }}</b>
                          </v-col>
                          <v-spacer />
                          <v-col>
                            <v-btn block color="primary" @click="addIngredient(item)">
                              Add This
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-data-iterator>
                </div>
              </v-form>
              <v-card-actions>
                <v-btn color="error" outlined @click="showAddIngredient = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Ingredient view -->
          <v-data-iterator :items="ingredients" :items-per-page="6">
            <!-- Header -->
            <template #header>
              <v-toolbar color="accent" flat dark dense class="mt-3">
                <v-toolbar-title>Ingredients</v-toolbar-title>
              </v-toolbar>
            </template>
            <!-- View -->
            <template #default="{ items }">
              <v-card v-for="item in items" :key="item._id" outlined class="py-3">
                <v-row>
                  <v-col class="d-inline-flex align-center">
                    <span class="text-subtitle-1 ml-3">{{ item.name }}</span>
                  </v-col>
                  <v-spacer />
                  <v-col class="d-inline-flex justify-end">
                    <v-btn icon color="error" @click="removeIngredient(item._id)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </template>
            <!-- No Data -->
            <template #no-data>
              <v-card outlined class="pl-4">
                <span class="text-overline pa-2">Add an ingredient to this item using the button above!</span>
              </v-card>
            </template>
          </v-data-iterator>

          <v-text-field v-model="price" outlined label="Price" prefix="₱" />
        </v-form>
        <v-card-actions>
          <v-btn color="primary" @click="addFood">
            Submit
          </v-btn>
          <v-btn color="error" outlined @click="addDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import Snackbar from '@/components/Snackbar';

export default {
  components: {
    Snackbar
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      alert: {
        show: false,
        type: 'warning',
        message: ''
      },

      addDialog: false,
      // Ingredient dialog
      showAddIngredient: false,
      searchIngredient: '',
      searchResults: [],
      // Form Data
      ingredients: [],
      name: '',
      itemtypes: ['Other'],
      itemtype: '',
      other: '',
      price: 0.00
    };
  },
  watch: {
    showDialog () {
      if (this.showDialog) {
        switch (this.type) {
          case 'add' :
            this.addDialog = true;
            break;
        }
      } else {
        this.addDialog = false;
        this.$emit('hide-dialog');
      }
    },
    addDialog () {
      if (!this.addDialog) {
        this.clear();
        this.$emit('hide-dialog');
      }
    },
    async searchIngredient () {
      if (this.searchIngredient === '') { return; }
      try {
        const res = await axios.get(`/api/ingredient?search=${this.searchIngredient}`);
        this.searchResults = res.data.res;
      } catch (err) {
        this.showAlert(err.response.data.message);
      }
    }
  },
  methods: {
    clear () {
      // Clear here
    },
    addIngredient (item) {
      this.ingredients.push(item);
      this.$refs.Snackbar.show('Ingredient added to list!');
    },
    removeIngredient (id) {
      this.ingredients = this.ingredients.filter((o) => {
        return o._id !== id;
      });
    },
    async addFood () {
      try {
        const ingredientIDs = [];
        for (const ingredient of this.ingredients) {
          ingredientIDs.push(ingredient._id);
        }
        const newItem = {
          name: this.name,
          type: this.itemtype,
          ingredients: ingredientIDs,
          price: this.price
        };
        const res = await axios.post('/api/food/', newItem);
        if (res.status === 201) {
          this.$refs.Snackbar.show('Item added successfully!');
          this.$emit('update-table');
        }
      } catch (err) {
        this.showAlert(err.response.data.message);
      }
    }
  }
};
</script>

<style>

</style>
