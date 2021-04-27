<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h4 class="text-h5">
        Customer Name: {{ fullname }}
      </h4>
      <v-btn color="primary" class="darken-2" plain>
        View Customer Info
      </v-btn>
    </div>
    <div>
      <v-list disabled>
        <h5 class="text-h6">
          Items
        </h5>
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-action>
            <span>PHP {{ item.price }}</span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-actions class="mb-4">
        <v-spacer />
        <v-btn color="warning" class="darken-2" depressed>
          Edit Order
        </v-btn>
        <v-btn color="primary" depressed>
          Resolve Order
        </v-btn>
      </v-card-actions>
    </div>
    <v-divider />
  </v-container>
</template>

<script>
export default {
  props: {
    test: {
      type: Boolean,
      default: false
    },
    testType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fullname: 'John Doe',
      items: []
    };
  },
  mounted () {
    if (this.test) {
      switch (this.testType) {
        case 0:
          this.fullname = 'John Doe';
          this.items = [
            { id: 1, name: 'Choco Milk Tea', price: 75 }
          ];
          break;
        case 1:
          this.fullname = 'George Orwell';
          this.items = [
            { id: 2, name: 'Cheesecake Milk Tea', price: 85 },
            { id: 3, name: 'Lychee Fruit Tea', price: 70 }
          ];
          break;
        case 2:
          this.fullname = 'Ceepo Diff';
          this.items = [
            { id: 2, name: 'Cheesecake Milk Tea', price: 85 }
          ];
      }
    }
  }
};
</script>

<style>

</style>
