<template>
  <v-container fill-height fluid class="secondary darken-3">
    <v-row>
      <v-col cols="6" offset="1">
        <v-card class="pa-4">
          <v-container>
            <h3 class="text-h4">
              Sign Up for Infiniscan
            </h3>
            <v-alert v-if="alert.show" class="mt-4" dense border="left" type="warning">
              {{ alert.message }}
            </v-alert>
            <v-text-field v-model="email" label="Email" />
            <v-text-field v-model="password" label="Password" type="password" />
            <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" />
            <v-text-field v-model="firstname" label="First Name" />
            <v-text-field v-model="lastname" label="Last Name" />
            <a href="#" @click="$router.push('/login')">Already have an account? Log in</a>
            <v-row class="mt-2">
              <v-col cols="3">
                <v-btn color="primary" large block @click="register">
                  Register for Infiniscan
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserRegistration',
  layout: 'empty',
  data () {
    return {
      alert: {
        show: false,
        message: ''
      },
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: ''
    };
  },
  methods: {
    showAlert (message) {
      this.alert.show = true;
      this.alert.message = message;
    },
    async register () {
      if (this.password !== this.confirmPassword) {
        this.showAlert('The passwords must match.');
      }
      const userData = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      };
      try {
        const res = await this.$axios.post('/api/user/auth/register', userData);
        if (res.data.res) {
          this.$cookies.set('user', res.data.res);
          this.$router.push('/');
        }
      } catch (err) {
        this.showAlert(err.message);
      }
    }
  }
};
</script>

<style>

</style>
