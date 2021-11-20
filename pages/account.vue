<template>
  <v-container fluid class="mt-5">
    <v-container class="px-9">
      <v-row>
        <v-col>
          <h2 class="white--text">
            Your Account
          </h2>
        </v-col>
      </v-row>
    </v-container>

    <v-card>
      <v-simple-table>
        <template #default>
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{{ user.firstname }} {{ user.lastname }}</td>
            </tr>
            <tr>
              <th>Rewards Points</th>
              <td>{{ user.points }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>Your Personal QR Code</v-card-title>
      <v-card-text>You can use this QR code to claim rewards, or have a staff member edit your account!</v-card-text>

      <v-card-actions class="d-flex justify-center">
        <canvas id="canvas" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'UserAccount',
  layout: 'user',
  data () {
    return {
      user: {}
    };
  },
  async mounted () {
    const res = await this.$axios.get(`/api/user/${this.$cookies.get('user').id}`);
    this.user = res.data.res;
    QRCode.toCanvas(document.getElementById('canvas'), `infiniscan:${this.$cookies.get('user').id}`);
  }
};
</script>

<style>

</style>
