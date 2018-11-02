<template>
    <b-dropdown-item @click="logout">logout</b-dropdown-item>
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
