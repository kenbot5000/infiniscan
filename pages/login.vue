<template>
  <v-container fill-height fluid class="secondary darken-3">
    <v-row>
      <video autoplay muted loop class="login-bg">
        <source :src="require('@/assets/video/pouringtea.mp4')">
      </video>
      <v-col cols="12" md="6" offset-md="1" class="login-content">
        <v-card>
          <v-container>
            <h3 class="text-h4">
              Infiniscan User Login
            </h3>
            <v-alert v-if="alert.show" class="mt-4" dense border="left" type="warning">
              {{ alert.message }}
            </v-alert>
            <v-text-field v-model="email" label="Email" @keyup.enter="login" />
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              @keyup.enter="login"
            />
            <a href="#" @click="$router.push('/register')">Don't have an account yet? Sign up now!</a>
            <v-row class="mt-2">
              <v-col cols="3">
                <v-btn large block color="primary" @click="login">
                  Login
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
  name: 'UserLogin',
  data () {
    return {
      alert: {
        show: false,
        message: ''
      },
      email: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    showAlert (message) {
      this.alert.show = true;
      this.alert.message = message;
    },
    async login () {
      const login = {
        email: this.email,
        password: this.password
      };
      try {
        const res = await this.$axios.post('/api/user/auth/login', login);
        if (res.data.res) {
          this.$store.commit('setUser', JSON.parse(res.data.res).id);
          this.$cookies.set('user', res.data.res);
          this.$router.push('/');
        }
      } catch (err) {
        this.showAlert(err.response.data.message);
      }
    }
  }
};
</script>

<style>
.login-bg {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

.login-content {
  position: fixed;
  bottom: 50%;
  transform: translate(0, 50%);
  width: 100%;
  padding: 20px;
}
</style>
