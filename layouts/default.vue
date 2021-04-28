<template>
  <v-app>
    <v-system-bar height="30" app color="secondary darken-3" dark>
      <v-spacer />
      <span>{{ time }}</span>
    </v-system-bar>

    <v-navigation-drawer v-model="showNav" app>
      <v-list nav>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="secondary">
      <v-app-bar-nav-icon @click="showNav = !showNav" />
      <v-app-bar-title>InfiniScan</v-app-bar-title>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      time: '',
      showNav: false
    };
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
