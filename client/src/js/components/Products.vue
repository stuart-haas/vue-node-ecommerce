<template>
  <div class="grid flex wrap three two@tablet one@mobile gutter">
    <product
      v-for="(product, index) in products"
      :key="index"
      :index="index"
      :product="product"
    >
    </product>
  </div>
</template>

<script>
import axios from 'axios'
import Product from './Product'
export default {
  data() {
    return {
      products: []
    }
  },
  created() {
    axios.get('/api/products')
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    product: Product
  }
}
</script>

<style lang="scss" scoped>

</style>