<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="text-h3 ml-4 mt-2 mb-2">
          Email Confirmation Simulation
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-text-field v-model="email" />
      <v-btn color="success" @click="confirmEmail">
        Confirm Email
      </v-btn>
    </v-row>
    <v-row v-if="showSuccess">
      Auth success! User now verified.
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      showSuccess: false
    };
  },
  methods: {
    async confirmEmail () {
      const res = await this.$axios.post('/api/user/auth/confirmemail', { email: this.email });
      if (res) {
        this.showSuccess = true;
      }
    }
  }
};
</script>

<style>

</style>
