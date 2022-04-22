<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="pb-3">
      <v-card-title>Edit Reward Item</v-card-title>
      <v-form class="mt-4 mx-4">
        <span>Selected Item: {{ selectedItem.name }}</span>
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
  props: {
    selectedItem: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      showDialog: false,
      points: 0
    };
  },
  watch: {
    showDialog (show) {
      if (show) {
        this.points = this.selectedItem.points;
      } else {
        this.points = 0;
      }
    }
  },
  methods: {
    async submitAnswer () {
      const body = { ...this.selectedItem };
      body.points = this.points;
      const res = await this.$axios.patch(`/api/food/${body._id}`, body);
      if (res.status) {
        this.$emit('snackbar', 'Food item updated!');
        this.$emit('update-reward-earn');
        this.showDialog = false;
      }
    }
  }
};
</script>
