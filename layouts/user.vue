<template>
  <v-app>
    <v-app-bar app class="primary lighten-1">
      <v-app-bar-nav-icon @click="drawer = true" />
      <h2 class="white--text">
        Infiniscan
      </h2>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav class="pa-4">
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" :disabled="item.disabled" @click="$router.push(item.link)">
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <div class="pa-4">
          <v-btn rounded block color="error" @click="logout">
            <v-icon>mdi-logout-variant</v-icon>Log Out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="secondary lighten-2">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'UserLayout',
  data () {
    return {
      drawer: false,
      items: [
        { icon: 'mdi-home', text: 'Home', link: '/' },
        { icon: 'mdi-basket', text: 'Your Order', link: 'order' },
        { icon: 'mdi-account', text: 'Account', link: 'account', disabled: true }
      ]
    };
  },
  mounted () {
    if (!this.$cookies.get('user')) {
      this.$router.push('/login');
    }
  },
  methods: {
    logout () {
      this.$store.state.user = '';
      this.$cookies.remove('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style>

</style>
