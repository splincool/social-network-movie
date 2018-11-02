<template>
  <b-container class="text-center">
    <b-form class="mb-4" @keyup.enter="onSignin">
      <b-form-group class='col' label="Signin">
              <b-row align-h="center">
      <b-col cols="auto">
        <b-form-input
        class="mb-2"
        name="email"
        label="Email"
        v-model="email"
        type="email"
        placeholder="Your email"
        required/>
      </b-col>
        <b-col cols="auto">
        <b-form-input
        class="mb-2"
        name="password"
        label="Password"
        v-model="password"
        type="password"
        placeholder="Your password"
        required/>
              </b-col>
                    </b-row>
      </b-form-group>
         <b-row align-h="center">
        <b-col cols="auto">
      <b-button class="mr-1" @click="onSignin" variant="primary">Login</b-button>
      </b-col>
      <b-col cols="auto">
      <b-button type="reset" @click="resetForm" variant="danger">Reset</b-button>
       </b-col>
       </b-row>
    </b-form>
    <span class="font-weight-light" v-if="error">{{error.message}}</span>
    <p>Forgot password? enter your email and reset your password!</p>
    <b-button type="submit" variant="danger" @click.prevent="onResetPassword">Reset</b-button>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/profile')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    },
    onResetPassword () {
      if (this.email === '') {
        return this.$store.dispatch('setError', { message: 'Email can not be blnak' })
      }
      this.$store.dispatch('resetPasswordWithEmail', { email: this.email })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    resetForm () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
