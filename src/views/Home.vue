<template>
  <b-container>
    <b-row>
      <b-col>
          <b-pagination
            size="md"
            :total-rows="100"
            v-model="currentPage"
            :per-page="10">
          </b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3"
        v-for="movie in movies"
        :key="movie.id">
        <b-card :title="movie.name"
          :img-src="movie.image.medium"
          :img-alt="movie.name"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 poiner"
          @click="movieRouter(movie.id)">
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      currentPage: 1
    }
  },
  created () {
    this.getMovies()
  },
  watch: {
    currentPage () {
      this.getMovies()
    }
  },
  computed: {
    movies () {
      return this.$store.getters.movies
    }
  },
  methods: {
    getMovies () {
      this.$store.dispatch('getMovies', `shows?page=${this.currentPage - 1}`)
    },
    movieRouter (id) {
      this.$router.push('movie/' + id)
    }
  }
}
</script>

<style>
.poiner {
  cursor: pointer;
}
</style>
