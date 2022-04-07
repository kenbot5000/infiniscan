<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="pb-3">
      <v-card-title>Add Reward Item</v-card-title>
      <v-form class="mt-4 mx-4">
        <v-text-field v-model.lazy="searchFood" outlined label="Search Food Item" />
        <v-card v-if="searchResults.length == 0" outlined>
          <v-card-title class="text-h6">
            Type in the name of the ingredient to search!
          </v-card-title>
        </v-card>
        <v-data-iterator v-else :items="searchResults" item-key="_id">
          <template #default="{ items }">
            <v-card v-for="item in items" :key="item._id" outlined class="pa-2 my-2">
              <v-row>
                <v-col>
                  <b class="text-h6">{{ item.name }}</b>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn block color="primary" @click="selectedItem = item">
                    Select This
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-data-iterator>
        <span v-if="selectedItem">Selected Item: {{ selectedItem.name }}</span>
        <v-text-field v-model="points" label="Points" />
      </v-form>
      <v-card-actions>
        <v-btn color="error" outlined @click="showDialog = false">
          Close
        </v-btn>
        <v-btn color="success" outlined @click="submitAnswer">
          Submit
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
      searchFood: '',
      searchResults: [],
      selectedItem: {},
      points: 0
    };
  },
  watch: {
    async searchFood () {
      if (this.searchFood === '') { return; }
      const { data } = await this.$axios.get(`/api/food?search=${this.searchFood}&noReward=true`);
      // console.log(data);
      this.searchResults = data.res;
    }
  },
  methods: {
    async submitAnswer () {
      if (this.points > 0) {
        this.selectedItem.points = this.points;
        const res = await this.$axios.patch(`/api/food/${this.selectedItem._id}`, this.selectedItem);
        if (res.status === 200) {
          this.$emit('snackbar', 'Food item updated!');
          this.$emit('update-reward-earn');
          this.showDialog = false;
        }
      } else {
        this.showAlert('Please enter a number greater than zero.');
      }
    }
  }
};
</script>

<style>

</style>
