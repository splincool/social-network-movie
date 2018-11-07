<template>
  <b-container class="text-center">
    <ProfileInfo/>
    <UpdateProfile v-if='update'/>
    <b-button
    class="m-3"
    @click="UpdateProfileUser">
    {{updateText}}
    </b-button>
    <myMovies/>
  </b-container>
</template>

<script>
import ProfileInfo from '../components/user/ProfileInfo.vue'
import UpdateProfile from '../components/user/UpdateProfile.vue'
import myMovies from '../components/myMovies.vue'

export default {
  name: 'Profile',
  components: {
    ProfileInfo,
    UpdateProfile,
    myMovies
  },
  data () {
    return {
      update: false,
      updateText: 'Update profile'
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    UpdateProfileUser () {
      this.update = !this.update
      if (this.update === false) {
        this.updateText = 'Update profile'
      } else {
        this.updateText = 'Cancel'
      }
    }
  }
}
</script>
