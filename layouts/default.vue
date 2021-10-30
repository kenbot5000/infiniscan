<template>
  <v-app>
    <v-system-bar height="30" app color="secondary darken-3" dark>
      <span>InfiniScan Dashboard v1.0.0</span>
      <v-spacer />
      <span>{{ time }}</span>
    </v-system-bar>

    <v-navigation-drawer v-model="showNav" app>
      <v-list nav flat>
        <v-list-item-group>
          <v-list-item class="text-h5" disabled>
            Welcome, User
          </v-list-item>
          <v-list-item to="/admin/">
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/order">
            <v-list-item-icon><v-icon>mdi-cash-register</v-icon></v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/orders/archive" disabled>
            <v-list-item-icon><v-icon>mdi-cash-lock</v-icon></v-list-item-icon>
            <v-list-item-title>Order Archive</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/stock">
            <v-list-item-icon><v-icon>mdi-inbox-multiple</v-icon></v-list-item-icon>
            <v-list-item-title>Stock</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/stock/archive">
            <v-list-item-icon><v-icon>mdi-archive</v-icon></v-list-item-icon>
            <v-list-item-title>Stock Archive</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/reporting" disabled>
            <v-list-item-icon><v-icon>mdi-chart-areaspline</v-icon></v-list-item-icon>
            <v-list-item-title>Reporting</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/rewards" disabled>
            <v-list-item-icon><v-icon>mdi-wallet-giftcard</v-icon></v-list-item-icon>
            <v-list-item-title>Rewards and Promos</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/users" disabled>
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>Manage Customers</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/accounts">
            <v-list-item-icon><v-icon>mdi-account-tie</v-icon></v-list-item-icon>
            <v-list-item-title>Admin Accounts</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="secondary">
      <v-app-bar-nav-icon @click="showNav = !showNav" />
      <v-app-bar-title>InfiniScan</v-app-bar-title>
      <v-spacer />
      <v-btn color="error" @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <transition name="fade">
        <nuxt v-show="showApp" />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      time: '',
      showNav: false,
      showApp: true
    };
  },
  watch: {
    $route () {
      this.showApp = false;
      this.showApp = true;
    }
  },
  mounted () {
    setInterval(this.getTime, 1000);

    if (!this.$cookies.get('admin')) {
      this.$router.push('/admin/login');
    }
  },
  methods: {
    getTime () {
      const dateString = new Date().toLocaleString('en-US');
      this.time = dateString;
    },
    logout () {
      this.$cookies.remove('admin');
      this.$router.push('/admin/login');
    }
  }
};
</script>

<style>
.fade-enter-active {
  transition: opacity 1s;
}
 .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
