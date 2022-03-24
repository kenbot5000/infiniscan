<template>
  <v-app>
    <v-system-bar height="30" app color="secondary darken-3" dark>
      <span>InfiniScan Dashboard v1.2.0</span>
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            icon
            x-small
            v-on="on"
          >
            <v-icon v-if="lowCount > 0" color="error">
              mdi-bell
            </v-icon>
            <v-icon v-else>
              mdi-bell
            </v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-if="lowCount > 0">
            <v-list-item-text>
              You have <v-chip color="error" x-small>
                {{ lowCount }}
              </v-chip> ingredients that need restocking
            </v-list-item-text>
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-text>
              You don't have any notifications
            </v-list-item-text>
          </v-list-item>
        </v-list>
      </v-menu>

      <span>{{ time }}</span>
    </v-system-bar>

    <v-navigation-drawer v-model="showNav" app>
      <v-list nav flat>
        <v-list-item-group>
          <v-list-item class="text-h5" disabled>
            Welcome, {{ admincookie.firstname }}
          </v-list-item>
          <v-list-item to="/admin/">
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/order">
            <v-list-item-icon><v-icon>mdi-cash-register</v-icon></v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/order/archive">
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
          <v-list-item to="/admin/reporting">
            <v-list-item-icon><v-icon>mdi-chart-areaspline</v-icon></v-list-item-icon>
            <v-list-item-title>Reporting</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/rewards" disabled>
            <v-list-item-icon><v-icon>mdi-wallet-giftcard</v-icon></v-list-item-icon>
            <v-list-item-title>Rewards and Promos</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/users">
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>Manage Customers</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="admincookie.isstandard" to="/admin/accounts">
            <v-list-item-icon><v-icon>mdi-account-tie</v-icon></v-list-item-icon>
            <v-list-item-title>Admin Accounts</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="admincookie.isstandard" to="/admin/accounts/archive">
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>Admin Account Archive</v-list-item-title>
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
  name: 'AdminDashboard',
  layout: 'admin',
  data () {
    return {
      time: '',
      showNav: false,
      showApp: true,
      lowCount: 0
    };
  },
  head () {
    return {
      title: 'Admin Dashboard'
    };
  },
  computed: {
    admincookie () {
      return this.$cookies.get('admin') ? this.$cookies.get('admin') : { firstname: '', isstandard: true };
    }
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

    this.getNotifications();
  },
  methods: {
    async getNotifications () {
      const { data } = await this.$axios.get('/notification/ingredientcount');
      this.lowCount = data.res;
    },
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
