<template>
  <v-container class="px-9 mt-4">
    <v-row>
      <v-col>
        <v-card outlined class="pa-3">
          <v-row>
            <v-col>
              <h3 class="text-h3 ml-4 mt-2 mb-2">
                Customer Management
              </h3>
              <v-data-table :headers="userHeaders" :items="items" :search="search">
                <template #top>
                  <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                  />
                </template>
                <template #[`item.address`]="{ item }">
                  <v-btn v-if="item.address" color="primary" @click="openAddressDialog(item.address)">
                    View Address
                  </v-btn>
                </template>
              </v-data-table>

              <v-dialog v-model="showDialog" width="500px">
                <v-card class="pb-4">
                  <v-card-title class="text-h5">
                    Address
                  </v-card-title>
                  <v-form class="mt-4 mx-4">
                    <v-text-field v-model="selectedRow.address1" readonly label="Street Address" />
                    <v-text-field v-model="selectedRow.address2" readonly label="Apartment/Block No." />
                    <v-text-field v-model="selectedRow.barangay" readonly label="Barangay" />
                    <v-text-field v-model="selectedRow.city" readonly label="City" />
                  </v-form>
                  <v-card-actions>
                    <v-btn color="error" @click="showDialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerManagement',
  layout: 'admin',
  data () {
    return {
      userHeaders: [
        { text: 'ID', value: 'displayID', sortable: true },
        { text: 'Email', value: 'email' },
        { text: 'First Name', value: 'firstname' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Rewards Points', value: 'points' },
        { text: 'Phone No.', value: 'phone' },
        { text: 'Address', value: 'address' }
      ],
      items: [],
      search: '',
      showDialog: false,
      selectedRow: {}
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/user');
    this.items = data.res;
  },
  methods: {
    openAddressDialog (row) {
      this.selectedRow = row;
      this.showDialog = true;
    }
  }
};
</script>

<style>

</style>
