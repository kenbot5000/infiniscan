<template>
  <v-app>
    <v-system-bar height="30" app color="secondary darken-3" dark>
      <v-spacer />
      <span>{{ time }}</span>
    </v-system-bar>

    <v-navigation-drawer v-model="showNav" app>
      <v-list nav flat>
        <v-list-item-group>
          <v-list-item to="/admin/">
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/stock">
            <v-list-item-icon><v-icon>mdi-inbox-multiple</v-icon></v-list-item-icon>
            <v-list-item-title>Stock</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="secondary">
      <v-app-bar-nav-icon @click="showNav = !showNav" />
      <v-app-bar-title>InfiniScan</v-app-bar-title>
      <v-spacer />
      <v-btn color="error">
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
  },
  methods: {
    getTime () {
      const dateString = new Date().toLocaleString('en-US');
      this.time = dateString;
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
