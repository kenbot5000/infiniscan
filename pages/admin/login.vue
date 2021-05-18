<template>
  <v-container fill-height fluid class="secondary">
    <v-row align="center" fill-height>
      <v-col cols="1">
        <!-- spacer -->
      </v-col>
      <v-col cols="5">
        <v-card class="pa-4">
          <h2 class="text-h3 my-4">
            InfiniScan Admin
          </h2>
          <v-form>
            <v-text-field v-model="email" label="Email" placeholder="email@email.com" />
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
            <v-btn color="primary" class="my-3" large block @click="login">
              Log In
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6">
        <!-- spacer -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      email: '',
      showPassword: false,
      password: '',
      rules: {
        required: value => !!value || 'Required'
      }
    };
  },
  head () {
    return {
      title: 'Admin Login'
    };
  },
  methods: {
    login () {
      this.$router.push('/admin');
    }
  }
};
</script>

<style>

</style>
