<template>
  <div class="column">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <p class="title is-4">{{ product.name }}</p>
          <p class="subtitle is-6">SKU: {{ product.sku }}</p>
          <p>Description: {{ product.description }}</p>
          <p>In Stock: {{ product.inStock }}</p>
          <input class="input is-rounded" type="text" placeholder="Quantity">
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Add to Cart</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    },
    index: {
      type: Number
    }
  }
}
</script>

<style lang="scss">

</style>