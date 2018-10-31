<template>
  <b-container>
    <b-row>
      <b-col>
        <signin/>
      </b-col>
      <b-col>
        <signup/>
        <loginWithGoogle class="mt-4"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import signin from '../components/user/Signin.vue'
import signup from '../components/user/Signup.vue'
import loginWithGoogle from '../components/user/loginWithGoogle.vue'

export default {
  name: 'authUser',
  components: {
    signin,
    signup,
    loginWithGoogle

  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
