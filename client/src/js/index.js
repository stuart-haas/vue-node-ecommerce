import Vue from 'vue'
import Navigation from './components/Navigation'
import Drawer from './components/Drawer'
import Products from './components/Products'
import Cart from './components/Cart'

Vue.filter('truncate', function (value, limit) {
  if (value.length > limit) {
      value = value.substring(0, (limit - 3)) + '...'
  }
  return value
})

new Vue({
  el: '#app',
  components: {
    navigation: Navigation,
    drawer: Drawer,
    products: Products,
    cart: Cart
  }
})