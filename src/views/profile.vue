<template>
  <b-container>
    <ProfileInfo/>
    <UpdateProfile v-if='update'/>
    <b-button
    class="m-3"
    @click="UpdateProfileUser">
    {{updateText}}
    </b-button>
  </b-container>
</template>

<script>
import ProfileInfo from '../components/user/ProfileInfo.vue'
import UpdateProfile from '../components/user/UpdateProfile.vue'

export default {
  name: 'Profile',
  components: {
    ProfileInfo,
    UpdateProfile
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
