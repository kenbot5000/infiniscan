<template>
  <v-container class="px-9 mt-4">
    <v-row>
      <v-col>
        <v-card outlined class="pa-3">
          <v-row>
            <v-col>
              <h3 class="text-h3 ml-4 mt-2 mb-2">
                Admin Archive
              </h3>
              <v-data-table :headers="archiveHeaders" :items="archive" :search="search">
                <template #top>
                  <v-text-field v-model="search" label="Search" class="mx-4" />
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
  name: 'AdminArchive',
  layout: 'admin',
  data () {
    return {
      archiveHeaders: [
        { text: 'Email', value: 'email' },
        { text: 'First Name', value: 'firstname' },
        { text: 'Last Name', value: 'lastname' }
      ],
      archive: [],
      search: ''
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/archive/admin');
    this.archive = data.res;
  }
};
</script>

<style>

</style>
