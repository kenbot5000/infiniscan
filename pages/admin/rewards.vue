<template>
  <v-container class="px-9">
    <Snackbar ref="Snackbar" type="primary" />
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <h3 class="text-h3 ml-2 mt-2 mb-4">
            Rewards
          </h3>
          <v-btn v-if="editMode || deleteMode" color="error" @click="close">
            Close
          </v-btn>
          <v-container class="mt-3">
            <v-data-table id="rewardEarnTable" :headers="rewardEarnHeaders" :items="rewardEarnData">
              <template #[`item.edit`]="{ item }">
                <v-btn color="warning" @click="editRewardEarn(item)">
                  Edit
                </v-btn>
              </template>
              <template #[`item.delete`]="{ item }">
                <v-btn color="error" @click="deleteRewardEarn(item)">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <AddRewardEarnDialog
      ref="AddRewardEarnDialog"
      @snackbar="sendMessage"
      @update-reward-earn="getEarnItems"
    />

    <EditRewardEarnDialog
      ref="EditRewardEarnDialog"
      :selected-item="selectedItem"
      @snackbar="sendMessage"
      @update-reward-earn="getEarnItems"
    />

    <DeleteRewardEarnDialog
      ref="DeleteRewardEarnDialog"
      :selected-item="selectedItem"
      @snackbar="sendMessage"
      @update-reward-earn="getEarnItems"
    />

    <v-speed-dial
      v-if="!$cookies.get('admin').isstandard"
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

      <v-btn fab large color="primary" @click="$refs.AddRewardEarnDialog.showDialog = true;">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn fab large color="warning" @click="editMode = true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn fab large color="error" @click="deleteMode = true">
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>
import Snackbar from '@/components/Snackbar';
import AddRewardEarnDialog from '@/components/rewards/AddRewardEarnDialog';
import EditRewardEarnDialog from '@/components/rewards/EditRewardEarnDialog';
import DeleteRewardEarnDialog from '@/components/rewards/DeleteRewardEarnDialog';

export default {
  name: 'RewardsManagement',
  components: {
    Snackbar,
    AddRewardEarnDialog,
    EditRewardEarnDialog,
    DeleteRewardEarnDialog
  },
  layout: 'admin',
  data () {
    return {
      fab: false,
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      editMode: false,
      deleteMode: false,
      rewardEarnHeaders: [
        { value: 'displayId', text: 'ID' },
        { value: 'name', text: 'Item Name' },
        { value: 'points', text: 'Points Earned' }
      ],
      rewardEarnData: [],
      selectedItem: {}
    };
  },
  watch: {
    editMode (on) {
      if (on) {
        this.rewardEarnHeaders.push({
          text: 'Edit',
          sortable: false,
          value: 'edit'
        });
      } else {
        this.rewardEarnHeaders.pop();
      }
    },
    deleteMode (on) {
      if (on) {
        this.rewardEarnHeaders.push({
          text: 'Reset',
          sortable: false,
          value: 'delete'
        });
      } else {
        this.rewardEarnHeaders.pop();
      }
    }
  },
  mounted () {
    this.getEarnItems();
  },
  methods: {
    sendMessage (msg) {
      this.$refs.Snackbar.show(msg);
    },
    async getEarnItems () {
      const { data } = await this.$axios.get('/rewards/earn');
      this.rewardEarnData = data.res;
    },
    editRewardEarn (item) {
      this.selectedItem = item;
      this.$refs.EditRewardEarnDialog.showDialog = true;
    },
    deleteRewardEarn (item) {
      this.selectedItem = item;
      this.$refs.DeleteRewardEarnDialog.showDialog = true;
    },
    close () {
      this.editMode = false;
      this.deleteMode = false;
    }
    // deleteRewardEarn(item) {
    //   this.selectedItem = item;
    //   this.
    // }
  }
};
</script>
