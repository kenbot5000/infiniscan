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
            <AdminCard :item="item" @load-admin="loadAdmin" />
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
              <v-btn color="error" class="mr-4" @click="actionDisplay = 'delete'">
                Delete Admin
              </v-btn>
              <v-btn color="error" outlined @click="actionDisplay = ''">
                Close
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- Add account -->
            <v-alert v-if="alert.show" :type="alert.type">
              {{ alert.message }}
            </v-alert>
            <v-card v-if="actionDisplay == 'add'">
              <v-card-title>Add Admin Account</v-card-title>
              <v-form class="mx-4 pr-4">
                <v-text-field v-model="form.firstname" label="First Name" />
                <v-text-field v-model="form.lastname" label="Last Name" />
                <v-text-field v-model="form.email" label="Email" />
                <v-text-field v-model="form.password" label="Password" type="password" />
                <v-text-field v-model="form.confirmpass" label="Confirm Password" type="password" />
              </v-form>
              <v-card-actions class="mx-2">
                <v-btn color="primary" large width="200" @click="addAdmin">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
            <!-- Edit Account -->
            <v-card v-if="actionDisplay == 'edit'" class="pb-4">
              <v-card-title>Edit Admin</v-card-title>
              <span v-if="form._id == ''" class="text-subtitle-2 ml-4">Choose a card from the left to edit it.</span>
              <v-form v-else class="mx-4 pr-4">
                <v-text-field v-model="form._id" label="ID" readonly filled />
                <v-text-field v-model="form.firstname" label="First Name" />
                <v-text-field v-model="form.lastname" label="Last Name" />
                <v-text-field v-model="form.email" label="Email" />
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                />
                <v-text-field
                  v-if="bufferPassword != form.password"
                  v-model="form.confirmpass"
                  label="Confirm Password"
                  :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirm ? 'text' : 'password'"
                  @click:append="showConfirm = !showConfirm"
                />
              </v-form>
              <v-card-actions v-if="form._id != ''">
                <v-btn color="primary" large width="200" @click="editAdmin">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
            <!-- Delete Account -->
            <v-card v-if="actionDisplay == 'delete'" class="pb-4">
              <v-card-title>Delete Admin</v-card-title>
              <span v-if="form._id == ''" class="text-subtitle-2 ml-4">Choose a card from the left to delete it.</span>
              <v-form v-else class="mx-4 pr-4">
                <v-text-field v-model="form._id" label="ID" readonly filled />
                <v-text-field v-model="form.email" label="Email" readonly filled />
                <v-switch v-model="confirmDelete" color="error" label="I am sure I want to delete this." />
              </v-form>
              <v-card-actions>
                <v-btn v-if="form._id !== ''" color="error" :disabled="!confirmDelete" @click="deleteAdmin">
                  Delete Account
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Snackbar from '@/components/Snackbar';
import AdminCard from '@/components/user/AdminCard';

export default {
  components: {
    Snackbar,
    AdminCard
  },
  layout: 'admin',
  data () {
    return {
      actionDisplay: '',
      alert: {
        show: false,
        message: '',
        type: ''
      },
      adminData: [],
      bufferPassword: '',
      showPassword: false,
      showConfirm: false,
      form: {
        _id: '',
        email: '',
        password: '',
        confirmpass: '',
        firstname: '',
        lastname: ''
      },
      confirmDelete: false
    };
  },
  head () {
    return {
      title: 'Admin Management'
    };
  },
  watch: {
    actionDisplay () {
      if (this.actionDisplay === '') {
        this.form = {
          _id: '',
          email: '',
          password: '',
          confirmpass: '',
          firstname: '',
          lastname: ''
        };
      }
    }
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
      const res = await this.$axios.get('/api/admin/');
      this.adminData = res.data.res;
    },
    async addAdmin () {
      this.alert.show = false;
      if (this.form.password !== this.form.confirmpass) {
        this.showAlert('Passwords do not match.');
        return;
      }
      const res = await this.$axios.post('/api/admin', this.form);
      if (res.status === 201) {
        this.$refs.Snackbar.show('Admin added successfully.');
        this.getAllAdmin();
        this.actionDisplay = '';
      }
    },
    loadAdmin (type, item) {
      this.actionDisplay = type;
      this.form = { ...item };
      this.bufferPassword = item.password;
    },
    async editAdmin () {
      this.alert.show = false;
      if ((this.form.password !== this.bufferPassword) && (this.form.password !== this.form.confirmpass)) {
        this.showAlert('Passwords do not match.');
        return;
      }
      // Checks if any field is empty
      if (!Object.values(this.form).every(o => o !== 'null')) {
        this.showAlert('Please fill in all fields.');
        return;
      }
      const res = await this.$axios.patch(`/api/admin/${this.form._id}`, this.form);
      if (res.status === 200) {
        this.$refs.Snackbar.show('Admin edited successfully.');
        this.getAllAdmin();
        this.actionDisplay = '';
      }
    },
    async deleteAdmin () {
      this.alert.show = false;
      try {
        const res = await this.$axios.delete(`/api/admin/${this.form._id}`);
        if (res.status === 204) {
          this.$refs.Snackbar.show('Admin deleted successfully.');
          this.getAllAdmin();
          this.actionDisplay = '';
        }
      } catch (err) {
        this.showAlert(err);
      }
    }
  }
};
</script>

<style>

</style>
