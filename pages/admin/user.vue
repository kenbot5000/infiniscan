<template>
  <v-container class="px-9 mt-4">
    <Snackbar ref="Snackbar" />
    <v-row>
      <v-col>
        <v-card outlined class="pa-3">
          <h3 class="text-h3 ml-4 mt-2 mb-2">
            Admin Management
          </h3>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col v-for="item of adminData" :key="item._id">
            <v-card width="350" class="pa-1">
              <v-card-title>Admin - Jane</v-card-title>
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
                  <v-col>********</v-col>
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
                <v-btn color="warning">
                  Edit Admin
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card class="d-inline-flex align-center pr-4">
              <v-card-title>Actions</v-card-title>
              <v-btn color="primary" class="mr-4" @click="actionDisplay = 'add'">
                Add Admin
              </v-btn>
              <v-btn color="secondary" class="mr-4" @click="actionDisplay = 'edit'">
                Edit Admin
              </v-btn>
              <v-btn color="error" outlined @click="actionDisplay = ''">
                Close
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card v-if="actionDisplay == 'add'">
              <v-alert v-if="alert.show" :type="alert.type">
                {{ alert.message }}
              </v-alert>
              <v-card-title>Add Admin Account</v-card-title>
              <v-form class="mx-4 pr-4">
                <v-text-field v-model="form.firstname" label="First Name" />
                <v-text-field v-model="form.lastname" label="Last Name" />
                <v-text-field v-model="form.email" label="Email" />
                <v-text-field v-model="form.password" label="Password" />
                <v-text-field v-model="form.confirmpass" label="Confirm Password" />
              </v-form>
              <v-card-actions class="mx-2">
                <v-btn color="primary" large width="200" @click="addAdmin">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-if="actionDisplay == 'edit'" class="pb-4">
              <v-card-title>Edit Admin</v-card-title>
              <span v-if="form.id == ''" class="text-subtitle-2 ml-4">Choose a card from the left to edit it.</span>
              <v-form v-else class="mx-4 pr-4">
                <v-text-field v-model="form.id" label="ID" readonly />
                <v-text-field v-model="form.firstname" label="First Name" />
                <v-text-field v-model="form.lastname" label="Last Name" />
                <v-text-field v-model="form.email" label="Email" />
                <v-text-field v-model="form.password" label="Password" />
                <v-text-field v-model="form.confirmpass" label="Confirm Password" />
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Snackbar from '@/components/Snackbar';

export default {
  components: {
    Snackbar
  },
  data () {
    return {
      actionDisplay: '',
      alert: {
        show: false,
        message: '',
        type: ''
      },
      adminData: [],
      form: {
        id: '',
        email: '',
        password: '',
        confirmpass: '',
        firstname: '',
        lastname: ''
      }
    };
  },
  head () {
    return {
      title: 'Admin Management'
    };
  },
  mounted () {
    this.getAllAdmin();
  },
  methods: {
    showAlert (msg, type = 'warning') {
      this.alert = {
        show: true,
        type,
        message: msg
      };
    },
    async getAllAdmin () {
      const res = await axios.get('/api/admin/');
      this.adminData = res.data.res;
    },
    async addAdmin () {
      if (this.password !== this.confirmpass) {
        this.showAlert('Passwords do not match.');
        return;
      }
      const res = await axios.post('/api/admin', this.form);
      if (res.status === 200) {
        this.$refs.Snackbar.show('Admin added successfully.');
      }
    }

  }
};
</script>

<style>

</style>
