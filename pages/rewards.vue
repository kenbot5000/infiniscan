<template>
  <v-container fluid>
    <Snackbar ref="Snackbar" type="primary" />
    <v-dialog v-model="showConfirmDialog" width="400">
      <v-card>
        <v-card-title>Are you sure you want to claim this?</v-card-title>
        <v-card-text>By claiming {{ selectedItem.item.name }}, {{ selectedItem.points }} points will be deducted from your account.</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="showConfirmDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="claim">
            Claim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card outlined>
      <v-card-title><h2>Rewards</h2></v-card-title>
      <v-data-iterator :items="activeRewardsItems" item-key="_id">
        <template #default="{ items }">
          <v-container v-for="item of items" :key="item._id" fluid>
            <v-card class="mx-3 pl-2 mb-3">
              <v-row justify="space-between">
                <v-col cols="6">
                  <h4>{{ item.item.name }}</h4>
                  <h5>Points required to claim: {{ item.points }}</h5>
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" @click="showConfirm(item)">
                    Claim
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </template>
      </v-data-iterator>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'user',
  data () {
    return {
      activeRewardsItems: [],
      showConfirmDialog: false,
      selectedItem: {
        item: {
          name: ''
        }
      }
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/api/rewards');
    this.activeRewardsItems = data.res;
  },
  methods: {
    showConfirm (item) {
      this.selectedItem = item;
      this.showConfirmDialog = true;
    },
    async claim () {
      const userId = this.$cookies.get('user').id;
      const body = {
        id: userId
      };
      const { data } = await this.$axios.post(`/api/rewards/claim?id=${this.selectedItem._id}`, body);
      if (data) {
        this.$refs.Snackbar.show('Item claimed!');
        this.showConfirmDialog = false;
      }
    }
  }
};
</script>

<style>

</style>
