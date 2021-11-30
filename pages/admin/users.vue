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
              </v-data-table>
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
        { text: 'Rewards Points', value: 'points' }
      ],
      items: [],
      search: ''
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/user');
    this.items = data.res;
  }
};
</script>

<style>

</style>
