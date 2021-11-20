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
      <v-data-iterator :items="items" hide-default-footer class="my-5">
        <template #header>
          <v-row>
            <v-col cols="8" class="subtitle-2">
              Item Name
            </v-col>
            <v-col cols="2" class="subtitle-2">
              Price
            </v-col>
            <v-col cols="2" class="subtitle-2">
              Quantity
            </v-col>
          </v-row>
        </template>
        <template #default="props">
          <v-row v-for="item in props.items" :key="item.name">
            <v-col cols="8">
              {{ item.name }}
            </v-col>
            <v-col cols="2">
              <span>&#8369;{{ item.price }}</span>
            </v-col>
            <v-col cols="2">
              <span>{{ item.quantity }}</span>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>

      <!-- <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-action>
            <v-row>
              <v-col>
                <span>&#8369;{{ item.price }}</span>
              </v-col>
              <v-col>
                <span>{{ item.quantity }}</span>
              </v-col>
            </v-row>
          </v-list-item-action>
        </v-list-item> -->
      <v-card-actions class="mb-4">
        <v-spacer />
        <v-btn color="warning" class="darken-2" depressed>
          Cancel Order
        </v-btn>
        <v-btn color="primary" depressed @click="$emit('show-accept', content)">
          Accept Order
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
    },
    content: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      items: []
    };
  },
  computed: {
    fullname () {
      return `${this.content.user.firstname} ${this.content.user.lastname}`;
    }
  },
  mounted () {
    // * Test items
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

    // * Actual functionality
    if (this.content.items) {
      for (const item of this.content.items) {
        if (this.items.some(o => o.name === item.name)) {
          const index = this.items.map(e => e.name).indexOf(item.name);
          this.items[index].quantity += 1;
        } else {
          this.items.push({ name: item.name, price: item.price, quantity: 1 });
        }
      }
    }
  }
};
</script>

<style>

</style>
