<template>
  <b-navbar toggleable="md" type="light" variant="primary">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand>Movie</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item to="/">Home</b-nav-item>
       <b-nav-item to="/about">About</b-nav-item>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-form @keyup.enter="searchMovie">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          type="text"
          placeholder="Search"
          v-model="searchValue"/>
        <b-button
          size="sm"
          class="my-2 my-sm-0"
          @click="searchMovie">
            Search
        </b-button>
      </b-nav-form>
      <b-nav-item-dropdown v-if="user" right>
        <!-- Using button-content slot -->
        <template v-if="user.name" slot="button-content">
          {{user.name}}
        </template>
        <template v-if="!user.name" slot="button-content">
          User
        </template>
        <b-dropdown-item to="/profile">Profile</b-dropdown-item>
        <logout/>
      </b-nav-item-dropdown>
      <b-navbar-nav v-if="!user">
      <b-nav-item to="/auth">Login/register</b-nav-item>
      </b-navbar-nav>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
import logout from '../components/user/logout.vue'
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  components: {
    logout
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    searchMovie () {
      if (this.searchValue) {
        this.$store.commit('setSearchValue', this.searchValue)
        this.searchValue = ''
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
