<template>
  <div class="cart">
    <h1 v-if="message">{{ message }}</h1>
    <div class="cart-products">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="cart-product card inline"
      >
        <div class="card-image">
          <img class="thumb" :src="product.image" :alt="product.name">
        </div>
        <div class="card-content">
          <p><strong>{{ product.name }}</strong></p>
          <p>${{ product.price }} x {{ product.quantity }} = ${{ product.subtotal }}</p>
        </div>
        <a class="card-button" @click="removeItem(product.id)">
          <i class="fas fa-trash"></i>
        </a>
      </div>
    </div>
    <div class="cart-footer">
      <div class="content">
        <h1>Total: ${{ total }}</h1>
        <a href="/cart/checkout">Checkout</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Events } from "../util/events"
export default {
  data() {
    return {
      products: [],
      total: 0,
      message: ''
    }
  },
  mounted() {
    Events.$on('refresh-cart', params => {
      this.refresh()
    })
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      axios.get('/api/cart')
        .then(response => {
          if(response.data.error) {
            this.products = []
            this.message = response.data.error
          } else {
            this.message = `You have ${response.data.data.items.length} items in your cart`
            this.products = response.data.data.items
            this.total = response.data.data.totalPrice
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    removeItem(id) {
      axios.delete(`/api/cart/${id}`)
        .then(response => {
          this.refresh()
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  padding: 2em;

  &-products {
    max-height: 380px;
    margin: 1em 0;
    overflow-y: scroll;
  }

  &-product {
    &:not(:last-child) {
      margin-bottom: .25em;
    }

    padding: .5em;
    border-bottom: solid 1px #f1e7da;
  }

  &-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    .content {
      display: flex;
      width: 100%;
      text-align: center;

      h1, a {
        flex: 1;
        padding: 1em;
      }

      h1 {
        background-color: #f1e7da;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffff00;
        font-size: 1.5rem;
        font-weight: 500;
        color: black;

        &:hover {
          background-color: lighten(#ffff00, 25%);
        }
      }
    }
  }
}
</style>