<template>
<b-container>
  <b-container class="text-center">
   <img v-if="loading" src="../assets/loading.gif" alt="loading..."/>
  </b-container>
  <b-container v-if="show">
    <b-row>
      <b-col md="3"
        v-for="movie in movies"
        :key="movie.show.id">
        <b-card :title="movie.show.name"
          :img-src="coverImage(movie)"
          :img-alt="movie.show.name"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 pointer"
          @click="movieRouter(movie.show.id)">
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</b-container>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
      show: false
    }
  },
  created () {
    this.getMovies()
  },
  watch: {
    '$store.state.searchValue' (_val) {
      if (_val) {
        this.getMovies()
      }
    },
    movies (val) {
      if (val) {
        this.show = true
      } else {

      }
    }
  },
  computed: {
    movies () {
      return this.$store.getters.movies
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    getMovies () {
      var queryLink = `search/shows?q=${this.$store.getters.searchValue}`
      this.$store.dispatch('getMovies', queryLink)
    },
    movieRouter (id) {
      this.$router.push('movie/' + id)
    },
    coverImage (movie) {
      return movie.show.image ? movie.show.image.medium : ''
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
