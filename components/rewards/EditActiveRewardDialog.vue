<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card class="pa-4">
      <h5 class="text-h5">
        Edit Active Rewards Item
      </h5>
      <v-text-field :value="displayName" label="Item to Edit" readonly />
      <v-text-field v-model="points" label="Points Needed to Claim" />
      <v-card-actions>
        <v-btn color="error" @click="showDialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="add">
          Submit Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          item: {
            name: ''
          }
        };
      }
    }
  },
  data () {
    return {
      showDialog: false,
      displayName: '',
      points: '',
      foodItems: []
    };
  },
  watch: {
    showDialog (show) {
      if (show) {
        this.displayName = this.item.item.name;
        this.points = this.item.points;
      } else {
        this.displayName = '';
        this.points = '';
      }
    }
  },
  methods: {
    async add () {
      const body = {
        points: this.points
      };
      const res = await this.$axios.put(`/api/rewards?id=${this.item._id}`, body);
      if (res) {
        this.$emit('snackbar', 'Edited item successfully!');
        this.showDialog = false;
      }
    }
  }
};
</script>

<style>

</style>
