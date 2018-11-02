<template>
  <b-container>
    <b-form class="mb-3" @submit.prevent="updateProfile">
      <h3 class="mb-3">Update Profile</h3>
      <b-col class="mb-3">
        <b-row class="mb-3">
          <b-form-input v-model="displayName" placeholder="Your name"/>
        </b-row>
        <b-row class="mb-3">
          <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a image..."
          accept=".jpg, .jpeg, .png">
          </b-form-file>
        </b-row>
      </b-col>
      <b-button class="mb-4" variant="primary" @click.prevent="updateProfile">Save</b-button>
      <b-progress
      v-if="progressShow"
      :value="progress"
      variant="success"
      :striped="striped"
      class="mb-2">
    </b-progress>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      displayName: '',
      file: null,
      striped: true
    }
  },
  methods: {
    updateProfile () {
      if (this.displayName !== '' && this.file !== null) {
        this.$store.dispatch('updateProfile', { displayName: this.displayName, photoURL: this.file })
      } if (this.displayName === '' && this.file !== null) {
        this.$store.dispatch('updateProfile', { displayName: this.user.name, photoURL: this.file })
      } else {
        this.showProgress = false
        this.$store.dispatch('updateProfile', { displayName: this.displayName })
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    progress () {
      return this.$store.getters.progress
    },
    progressShow () {
      return this.$store.state.progressShow
    }
  }
}
</script>
