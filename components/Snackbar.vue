<template>
  <!-- Wrapper for snackbar -->
  <v-snackbar v-model="display" :timeout="2000" :type="type" centered>
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      display: false,
      text: ''
    };
  },
  methods: {
    show (msg) {
      this.display = true;
      this.text = msg;
    },
    hide () {
      this.display = false;
    }
  }
};
</script>

<style>

</style>
