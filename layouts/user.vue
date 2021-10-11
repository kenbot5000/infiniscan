<template>
  <v-app>
    <v-main class="grey lighten-4">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted () {
    if (!this.$cookies.get('user')) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>

</style>
