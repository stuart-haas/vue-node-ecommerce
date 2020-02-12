<template>
  <div class="section">
    <div class="columns is-vcentered is-centered">
      <div class="column is-8">
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input :class="[{'is-danger': !emailValid && user.email && hasEmailChanged}, {'is-success': emailValid && user.email && hasEmailChanged}, 'input']" type="text" v-model="user.email" @input="hasEmailChanged=false" @change="validateEmail">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right" v-if="emailValid && user.email && hasEmailChanged">
                <i class="fas fa-check"></i>
              </span>
              <span class="icon is-small is-right" v-if="!emailValid && user.email && hasEmailChanged">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>
          <p class="help is-success" v-if="emailValid && user.email && hasEmailChanged">This email is available</p>
          <p class="help is-danger" v-if="!emailValid && user.email && hasEmailChanged">This email is not available</p>
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input :class="[{'is-danger': !userValid && user.username && hasUserChanged}, {'is-success': userValid && user.username && hasUserChanged}, 'input']" type="text" v-model="user.username" @input="hasUserChanged=false" @change="validateUsername">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right" v-if="userValid && user.username && hasUserChanged">
                <i class="fas fa-check"></i>
              </span>
              <span class="icon is-small is-right" v-if="!userValid && user.username && hasUserChanged">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help is-success" v-if="userValid && user.username && hasUserChanged">This username is available</p>
            <p class="help is-danger" v-if="!userValid && user.username && hasUserChanged">This username is not available</p>
          </div>
          <password></password>
          <div class="field">
            <label class="label">Password Confirm</label>
            <div class="control">
              <input class="input" type="password" v-model="user.passwordConf">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import Password from '../components/fields/Password'
export default {
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null,
        passwordConf: null
      },
      emailValid: false,
      userValid: false,
      hasEmailChanged: false,
      hasUserChanged: false
    }
  },
  methods: {
    validateEmail() {
      const self = this
      this.hasEmailChanged = true
      axios({
        method: 'get',
        url: '/api/users/email',
        params: {
          email: this.user.email
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        if(response.data.length) {
          self.emailValid = false
        } else {
          self.emailValid = true
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    validateUsername() {
      const self = this
      this.hasUserChanged = true
      axios({
        method: 'get',
        url: '/api/users/name',
        params: {
          username: this.user.username
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        if(response.data.length) {
          self.userValid = false
        } else {
          self.userValid = true
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    onSubmit() {
      var data = qs.stringify({
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        passwordConf: this.user.passwordConf
      })
      axios({
        method: 'post',
        url: '/api/users/register',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response.data)
      })
    }
  },
  components: {
    password: Password
  }
}
</script>

<style lang="scss">
form {
  label {
    display: block;
  }
}
</style>