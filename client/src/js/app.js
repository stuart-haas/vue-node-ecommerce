window.Vue = require('vue')

import Navigation from './components/Navigation'

const app = new Vue({
  el: '#app',
  components: {
    Navigation
  },
  data: function() {
    return {
      message: 'Hello World!'
    }
  }
})