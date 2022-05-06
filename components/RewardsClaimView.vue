<template>
  <v-container>
    <v-card class="pa-4">
      <h3 class="text-h5 ml-2 mt-2 mb-4">
        Active Rewards
      </h3>
      <v-spacer />
      <v-btn color="primary" @click="$refs.AddActiveRewardDialog.showDialog = true">
        Add Active Reward
      </v-btn>
      <v-data-table :headers="headers" :items="promos">
        <template #[`item.item`]="{ item }">
          {{ item.item.name }}
        </template>
        <template #[`item.edit`]="{ item }">
          <v-btn color="warning" @click="showEdit(item)">
            Edit Points
          </v-btn>
        </template>
        <template #[`item.delete`]="{ item }">
          <v-btn color="error" @click="resetItem(item._id)">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <AddActiveRewardDialog ref="AddActiveRewardDialog" @snackbar="emitSnackbar" />
    <EditActiveRewardDialog ref="EditActiveRewardDialog" :item="selectedItem" @snackbar="emitSnackbar" />
  </v-container>
</template>

<script>
import AddActiveRewardDialog from '@/components/rewards/AddActiveRewardDialog';
import EditActiveRewardDialog from '@/components/rewards/EditActiveRewardDialog';

export default {
  components: {
    AddActiveRewardDialog,
    EditActiveRewardDialog
  },
  data () {
    return {
      headers: [
        { text: 'Item Name', value: 'item' },
        { text: 'Points Cost', value: 'points' },
        { text: 'Edit', value: 'edit' },
        { text: 'Reset', value: 'delete' }
      ],
      promos: [],
      selectedItem: {}
    };
  },
  mounted () {
    this.getPromos();
  },
  methods: {
    emitSnackbar (msg) {
      this.getPromos();
      this.$emit('snackbar', msg);
    },
    async getPromos () {
      const { data } = await this.$axios.get('/api/rewards/');
      this.promos = data.res;
    },
    showEdit (item) {
      this.selectedItem = item;
      this.$refs.EditActiveRewardDialog.showDialog = true;
    },
    async resetItem (id) {
      const res = await this.$axios.delete(`/api/rewards?id=${id}`);
      if (res) {
        this.emitSnackbar('Item reset successfully!');
      }
    }
  }
};
</script>

<style>

</style>
