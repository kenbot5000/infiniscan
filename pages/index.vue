<template>
  <v-container class="px-9 mt-5">
    <Snackbar ref="Snackbar" />
    <v-alert v-if="alert.show" :type="alert.type">
      {{ alert.message }}
    </v-alert>
    <v-row>
      <v-col>
        <v-card outlined shaped class="accent lighten-5">
          <v-card-title>
            Welcome to Infiniscan!
          </v-card-title>
          <v-card-text>
            Add our milk tea drinks and food to your cart.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="white--text">
          Menu
        </h2>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <v-col v-for="item in foodData" :key="item._id">
        <v-card>
          <v-img class="align-end" height="200px" :src="require('@/assets/images/milktea.jpg')" />
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>
            {{ item.type }}
          </v-card-subtitle>
          <v-card-text>
            ₱{{ item.price }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" rounded @click="addToCart(item)">
              <v-icon>mdi-basket-fill</v-icon>Add to Basket!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Snackbar from '@/components/Snackbar';

export default {
  name: 'UserDashboard',
  components: {
    Snackbar
  },
  layout: 'user',
  data () {
    return {
      userID: '',
      alert: {
        show: false,
        type: '',
        message: ''
      },
      foodData: []
    };
  },
  async mounted () {
    const { data } = await this.$axios.get('/api/food');
    this.foodData = data.res;
    this.userID = this.$cookies.get('user').id;
  },
  methods: {
    showAlert (msg, type = 'warning') {
      this.alert = {
        show: true,
        type,
        message: msg
      };
    },
    async addToCart (item) {
      this.alert.show = false;
      const body = {
        id: this.userID,
        foodID: item._id
      };
      try {
        const { data } = await this.$axios.post('/api/order', body);
        this.$refs.Snackbar.show(data.res);
      } catch (error) {
        this.showAlert(error);
      }
    }
  }
};
</script>
