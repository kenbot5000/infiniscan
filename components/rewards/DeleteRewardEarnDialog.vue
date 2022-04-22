<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="pb-3">
      <v-card-title>Reset Reward Item</v-card-title>
      <v-form class="mt-4 mx-4">
        <span>You are resetting the following item: {{ selectedItem.name }}</span>
      </v-form>
      <v-card-actions>
        <v-btn color="error" outlined @click="showDialog = false">
          Close
        </v-btn>
        <v-btn color="success" outlined @click="submitAnswer">
          Confirm Reset
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
      showDialog: false
    };
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
