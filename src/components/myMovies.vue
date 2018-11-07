<template>
  <b-container class="text-center">
    <b-container class="text-center">
      <img class="mt-6" v-if="loading" src="../assets/loading.gif" alt="loading..."/>
    </b-container>
    <b-container v-if="show">
      <h2>My favourites</h2>
      <b-row align-h="center">
        <b-col md="3"
          class="mb-3"
          v-for="movie in myMovies"
          :key="movie.id">
          <b-card :title="movie.name"
          :img-src="movie.image.medium"
          :img-alt="movie.name"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 pointer"
            @click="movieRouter(movie.id)">
          </b-card>
          <b-button @click="deleteMyMovies(movie.id)" variant="primary">
          Remove from favorites
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import movieCard from '../components/movieCard.vue'
export default {
  name: 'myMovies',
  data () {
    return {
      show: false
    }
  },
  components: {
    movieCard
  },
  created () {
    this.getMyMovies()
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    user () {
      return this.$store.state.user
    },
    myMovies () {
      return this.$store.state.myMovies
    }
  },
  watch: {
    myMovies (val) {
      if (val) {
        this.show = true
      } else {

      }
    },
    getMyMovies () {
      this.$store.dispatch('getMyMovies')
    }
  },
  methods: {
    deleteMyMovies (id) {
      this.$store.dispatch('deleteMyMovies', id)
      this.getMyMovies()
    },
    getMyMovies () {
      this.$store.dispatch('getMyMovies')
    },
    movieRouter (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>
