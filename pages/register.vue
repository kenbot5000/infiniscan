<template>
  <v-container fill-height fluid class="secondary darken-3">
    <v-row>
      <v-col cols="12" md="6" offset-md="1">
        <v-card class="pa-4">
          <v-container>
            <h3 class="text-h4">
              Sign Up for Infiniscan
            </h3>
            <v-alert v-if="alert.show" class="mt-4" dense border="left" type="warning">
              {{ alert.message }}
            </v-alert>
            <v-text-field v-model="email" label="Email*" required />
            <v-text-field v-model="password" label="Password*" type="password" required />
            <v-text-field v-model="confirmPassword" label="Confirm Password*" type="password" required />
            <v-text-field v-model="firstname" label="First Name*" required />
            <v-text-field v-model="lastname" label="Last Name*" required />
            <v-text-field v-model="phone" label="Phone*" required />
            <v-text-field v-model="address1" label="Street Address*" required />
            <v-text-field v-model="address2" label="House/Block No." />
            <v-text-field v-model="barangay" label="Barangay*" required />
            <v-text-field v-model="city" label="City*" required />
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
      lastname: '',
      phone: '',
      address1: '',
      address2: '',
      barangay: '',
      city: ''
    };
  },
  methods: {
    showAlert (message) {
      this.alert.show = true;
      this.alert.message = message;
    },
    async register () {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if (!(this.email === '' ? null : !!(reg.test(this.email)))) {
        this.showAlert('Email must follow the format of email.com');
        return;
      }

      if (!this.email || !this.password || !this.confirmPassword || !this.firstname || !this.lastname || !this.phone || !this.address1 || !this.barangay || !this.city) {
        this.showAlert('Please fill out all required fields.');
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.showAlert('The passwords must match.');
        return;
      }
      const userData = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        address1: this.address1,
        barangay: this.barangay,
        city: this.city
      };
      if (this.address2) {
        userData.address2 = this.address2;
      }
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
