<template>
  <div class="field">
    <label class="label">Password</label>
    <div class="control">
      <input :class="[passwordStrength, 'input']" type="password" v-model="user.password" @input="validatePassword">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordStrength: null
    }
  },
  methods: {
    validatePassword() {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
      if(strongRegex.test(this.user.password)) {
        this.passwordStrength = this.user.password ? 'is-success' : ''
      } else if(mediumRegex.test(this.user.password)) {
        this.passwordStrength = this.user.password ? 'is-warning' : ''
      } else {
        this.passwordStrength = this.user.password ? 'is-danger' : ''
      }
    }
  }
}
</script>

<style lang="scss">

</style>