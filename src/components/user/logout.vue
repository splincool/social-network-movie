<template>
  <div class="logout">
    <img src='../../assets/logout.png' alt="logout" id="logout" @click="logout">
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
