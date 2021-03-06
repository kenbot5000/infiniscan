<template>
  <v-container>
    <v-dialog v-model="addDialog" width="600">
      <v-card class="pb-3">
        <v-card-title class="text-h5">
          Add Ingredient
        </v-card-title>
        <v-alert v-if="alert.show" :type="alert.type">
          {{ alert.message }}
        </v-alert>
        <v-form class="mt-4 mx-4">
          <v-text-field v-model="name" label="Name of Ingredient" outlined />
          <v-text-field v-model="serving" label="Serving Size" outlined placeholder="(g, kg, mL)" />
          <v-select v-model="itemtype" :items="itemtypes" label="Ingedient Type" outlined />
          <v-text-field v-if="itemtype == 'Other'" v-model="newType" label="New Category" outlined placeholder="Case sensitive" />
          <v-text-field v-model="stock" :rules="[rules.number]" label="Stock" outlined placeholder="Input a number" />
          <v-text-field v-model="critical" :rules="[rules.number]" label="Critical Level" outlined placeholder="How few servings to be critical stock level?" />
        </v-form>
        <v-card-actions>
          <v-btn color="success" @click="submitAdd">
            Add Item
          </v-btn>
          <v-btn color="error" @click="clear">
            Clear
          </v-btn>
          <v-btn color="warning" @click="addDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="2000"
        absolute
        bottom
        text
        :color="snackbar.color"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-dialog>

    <v-dialog v-model="editDialog" width="600">
      <v-card class="pb-3">
        <v-card-title class="text-h5">
          Edit Ingredient
        </v-card-title>
        <v-alert v-if="alert.show" :type="alert.type">
          {{ alert.message }}
        </v-alert>
        <v-form class="mt-4 mx-4">
          <v-text-field v-model.lazy="id" label="Ingredient ID" outlined placeholder="Paste from table" clearable />
          <v-text-field v-model="name" label="Name of Ingredient" outlined />
          <v-text-field v-model="serving" label="Serving Size" outlined placeholder="(g, kg, mL)" />
          <v-select v-model="itemtype" :items="itemtypes" label="Ingedient Type" outlined />
          <v-text-field v-if="itemtype == 'Other'" v-model="newType" label="New Category" outlined placeholder="Case sensitive" />
          <v-text-field v-model="stock" :rules="[rules.number]" label="Stock" outlined placeholder="Input a number" />
          <v-text-field v-model="critical" :rules="[rules.number]" label="Critical Level" outlined placeholder="How few servings to be critical stock level?" />
        </v-form>
        <v-card-actions>
          <v-btn color="success" @click="submitEdit">
            Submit Edit
          </v-btn>
          <v-btn color="error" @click="clear">
            Clear
          </v-btn>
          <v-btn color="warning" @click="editDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="2000"
        absolute
        bottom
        text
        :color="snackbar.color"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="600">
      <v-card class="text-h5">
        <v-card-title class="text-h5">
          Send Ingredient to Archive
        </v-card-title>
        <v-alert v-if="alert.show" :type="alert.type">
          {{ alert.message }}
        </v-alert>
        <v-form class="mt-4 mx-4">
          <v-text-field v-model.lazy="id" label="Ingredient ID" outlined placeholder="Paste from table" clearable />
          <v-text-field v-model="name" label="Name of Ingredient" outlined readonly />
          <v-switch v-model="confirmDelete" color="secondary" label="I am sure I want to archive this item." />
        </v-form>
        <v-card-actions>
          <v-btn color="error" @click="submitDelete">
            Archive this Item
          </v-btn>
          <v-btn color="warning" @click="deleteDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="2000"
        absolute
        bottom
        text
        :color="snackbar.color"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
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
        type: '',
        message: ''
      },
      snackbar: {
        show: false,
        color: '',
        message: ''
      },
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      // Form data
      id: '',
      name: '',
      serving: '',
      itemtypes: [],
      itemtype: '',
      newType: '',
      stock: 0,
      critical: 0,
      // Form rules
      rules: {
        number: value => !isNaN(value)
      },
      confirmDelete: false
    };
  },
  watch: {
    showDialog () {
      if (this.showDialog) {
        switch (this.type) {
          case 'add' :
            this.addDialog = true;
            break;
          case 'edit' :
            this.editDialog = true;
            break;
          case 'delete' :
            this.deleteDialog = true;
            break;
        }
      } else {
        this.addDialog = false;
        this.editDialog = false;
        this.deleteDialog = false;
        this.$emit('hideDialog');
      }
    },
    addDialog () {
      if (!this.addDialog) {
        this.clear();
        this.$emit('hideDialog');
      }
    },
    editDialog () {
      if (!this.editDialog) {
        this.clear();
        this.$emit('hideDialog');
      }
    },
    deleteDialog () {
      if (!this.deleteDialog) {
        this.$emit('hideDialog');
        this.clear();
        this.confirmDelete = false;
      }
    },
    async id () {
      if (this.editDialog || this.deleteDialog) {
        try {
          const res = await this.$axios.get(`/api/ingredient/${this.id}`);
          if (res.status === 200) {
            this.alert.show = false;
            const item = res.data.res;
            this.name = item.name;
            this.serving = item.serving;
            this.itemtype = item.itemtype;
            this.stock = item.stock;
            this.critical = item.critical;
          }
        } catch (err) {
          this.showAlert(err.response.data.message);
        }
      }
    }
  },
  mounted () {
    this.getIngredientTypes();
  },
  methods: {
    showAlert (msg, type = 'warning') {
      this.alert = {
        show: true,
        type,
        message: msg
      };
    },
    showSnackbar (msg, color = 'primary') {
      this.snackbar = {
        show: true,
        color,
        message: msg
      };
    },
    async getIngredientTypes () {
      const res = await this.$axios.get('/api/ingredient/?sortBy=type');
      this.itemtypes = res.data.res;
      this.itemtypes.push('Other');
    },
    clear () {
      this.id = '';
      this.name = '';
      this.serving = '';
      this.itemtype = '';
      this.newType = '';
      this.critical = 0;
    },
    async submitAdd () {
      this.alert.show = false;
      const itemtype = this.itemtype === 'Other' ? this.newType : this.itemtype;
      // * Item type already exists
      if (this.itemtypes.includes(this.newType)) {
        this.showAlert('This item type is already in the database. Select it from the dropdown.');
        return;
      }
      const formData = {
        name: this.name,
        serving: this.serving,
        itemtype,
        stock: this.stock,
        critical: this.critical
      };
      try {
        const res = await this.$axios.post('/api/ingredient/', formData);
        if (res.status === 201) {
          this.showSnackbar('Ingredient added successfully.');
          this.getIngredientTypes();
          this.$emit('updateTable');
        }
      } catch (err) {
        this.showAlert(err.response.data.message);
      }
    },
    async submitEdit () {
      this.alert.show = false;
      const itemtype = this.itemtype === 'Other' ? this.newType : this.itemtype;
      // * Item type already exists
      if (this.itemtypes.includes(this.newType)) {
        this.showAlert('This item type is already in the database. Select it from the dropdown.');
        return;
      }
      const formData = {
        name: this.name,
        serving: this.serving,
        itemtype,
        stock: this.stock,
        critical: this.critical
      };
      try {
        const res = await this.$axios.patch(`/api/ingredient/${this.id}`, formData);
        if (res.status === 200) {
          this.showSnackbar('Ingredient edited successfully.');
          this.getIngredientTypes();
          this.$emit('updateTable');
        }
      } catch (err) {
        this.showAlert(err.response.data.message);
      }
    },
    async submitDelete () {
      this.alert.show = false;
      if (!this.confirmDelete) {
        this.showAlert('The deletion must be confirmed.');
        return;
      }
      try {
        const res = await this.$axios.delete(`/api/ingredient/${this.id}`);
        if (res.status === 200) {
          this.showSnackbar('Item deleted successfully.');
          this.getIngredientTypes();
          this.$emit('updateTable');
          this.deleteDialog = false;
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
