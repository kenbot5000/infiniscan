<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card class="pa-4">
      <h5 class="text-h5">
        Add Item to Active Rewards
      </h5>
      <v-select v-model="selectedFoodItem" :items="foodItems" label="Select Item" item-text="name" item-value="_id" />
      <v-text-field v-model="points" label="Points Needed to Claim" />
      <v-card-actions>
        <v-btn color="error" @click="showDialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="add">
          Add Reward
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      showDialog: false,
      selectedFoodItem: '',
      points: '',
      foodItems: []
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/api/food');
    this.foodItems = data.res;
  },
  methods: {
    async add () {
      const body = {
        points: this.points
      };
      const res = await this.$axios.post(`/api/rewards?id=${this.selectedFoodItem}`, body);
      if (res) {
        this.$emit('snackbar', 'Added item successfully!');
        this.showDialog = false;
      }
    }
  }
};
</script>

<style>

</style>
