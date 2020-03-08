<template>
  <div class="column gutter">
    <div class="card stacked">
      <div class="card-image">
        <img :src="product.image" :alt="product.name">
      </div>
      <div class="card-content">
        <a :href="link"><h3 class="title">{{ product.name }}</h3></a>
        <p>${{ product.price }}</p>
      </div>
      <footer class="card-footer input-group">
        <input type="text" placeholder="Quantity" v-model="quantity">
        <input class="success" type="button" value="Add to Cart" @click="addToCart">
      </footer>
    </div>
  </div>
</template>

<script>
import { Events } from "../util/events"
import axios from 'axios'
export default {
  props: {
    product: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    link() {
      return '/store/products/' + this.product.sku
    }
  },
  methods: {
    addToCart() {
      axios.post(`/api/cart/${this.product.id}`, null, { data: {
        quantity: this.quantity,
        price: this.product.price
      }}).then(response => {
        Events.$emit('refresh-cart')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>