<template>
  <b-container>
    <h2>Profile info</h2>
    <b-row>
    <b-col>
    <b-img rounded width="200"
    v-if='!defaultPhoto'
     height="300"
     thumbnail class="m-3"
     :src='user.photoURL'
     fluid alt="userIcon"/>
    <b-img rounded width="200"
    v-if='defaultPhoto'
     height="200"
     thumbnail class="m-3"
     blank
     blank-color="#777"
     fluid alt="userIcon"/>
    <h2 class="m-3">{{ user.name }}</h2>
    <p class="m-3"><b>Your email: </b> {{ user.email }}</p>
    </b-col>
     </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      defaultPhoto: true
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value === null || value === undefined) {
        this.$router.push('*')
      } else {
      }
    },
    photo () {
      debugger
      if (this.user.photoURL !== null && this.user.photoURL !== undefined) {
        this.defaultPhoto = false
      } else {
        this.defaultPhoto = true
      }
    }
  }
}
</script>
