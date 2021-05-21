<template>
  <v-card width="350" class="pa-1">
    <v-card-title>Admin - {{ item.firstname }}</v-card-title>
    <v-card-text class="grey--text text--darken-4">
      <v-row>
        <v-col><b>ID</b></v-col>
        <v-col>{{ item._id }}</v-col>
      </v-row>
      <v-row>
        <v-col><b>Email</b></v-col>
        <v-col>{{ item.email }}</v-col>
      </v-row>
      <v-row>
        <v-col><b>Password</b></v-col>
        <v-col>{{ passwordDisplay }}</v-col>
      </v-row>
      <v-row>
        <v-col><b>First Name</b></v-col>
        <v-col>{{ item.firstname }}</v-col>
      </v-row>
      <v-row>
        <v-col><b>Last Name</b></v-col>
        <v-col>{{ item.lastname }}</v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="warning" @click="loadAdmin('edit')">
        Edit Admin
      </v-btn>
      <v-btn color="error" @click="loadAdmin('delete')">
        Delete Admin
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          _id: '',
          email: '',
          password: '',
          firstname: '',
          lastname: ''
        };
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
    passwordDisplay () {
      return '*'.repeat(this.item.password.length);
    }
  },
  methods: {
    loadAdmin (type) {
      this.$emit('load-admin', type, this.item);
    }
  }
};
</script>

<style>

</style>
