<template>
  <div class="loginWithGoogle">
    <b-button variant="primary" @click.prevent="onSigninGoogle" class="google">Login with
      <img src="../../assets/google.png">oogle
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'loginWithGoogle',
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
    onSigninGoogle () {
      this.$store.dispatch('signUserInGoogle')
    }
  }
}
</script>
