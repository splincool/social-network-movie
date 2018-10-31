<template>
  <b-form>
     <b-form-group class='col' label="Signup">
    <b-form-input
      name="email"
      label="Email"
      class="mb-2"
      id="email"
      v-model="email"
      type="email"
      placeholder="Enter email"
      required/>
    <b-form-input
      name="password"
      class="mb-2"
      id="password"
      v-model="password"
      type="password"
      placeholder="Enter password"
      required/>
      <b-form-input
        name="confirmPassword"
        class="mb-2"
        label="Confirm Password"
        placeholder="Confirm Password"
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        :rules="[comparePasswords]"/>
           <b-form-input
      name="text"
      id="userName"
      v-model="userName"
      class="mb-2"
      type="text"
      placeholder="Enter Name"
      required/>
      </b-form-group>
      <b-button @click="onSignup" variant="primary" class="mr-1">Submit</b-button>
      <b-button type="reset" @click="resetForm" variant="danger">Reset</b-button>
    </b-form>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      userName: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
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
    onSignup () {
      if (this.comparePasswords === '') {
        this.$store.dispatch('signUserUp', { email: this.email, password: this.password, displayName: this.userName })
      } else {
        alert('Passwords do not match')
      }
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    resetForm () {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.userName = ''
    }
  }
}
</script>
