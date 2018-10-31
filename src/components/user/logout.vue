<template>
  <div class="logout">
    <b-button @click="logout">logout</b-button>
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
