<template>
  <div class="grid flex auto">
    <nav class="nav column">
      <a class="nav-item" href="/store">Store</a>
    </nav>
    <nav class="nav column">
      <a class="nav-item" href="/account">Account</a>
      <a class="nav-item" @click="toggleDrawer"><i class="fas fa-shopping-cart" :data-count="totalItems"></i></a>
    </nav>
  </div>
</template>

<script>
import { Events } from "../util/events"
export default {
  data() {
    return {
      drawerVisible: false,
      totalItems: 0
    }
  },
  mounted() {
    Events.$on('cart-refresh', params => {
      this.totalItems = params.totalItems
    })
  },
  methods: {
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible
      Events.$emit('toggle-drawer', { visible: this.drawerVisible })
    }
  }
}
</script>

<style lang="scss">

</style>