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
          class="mb-2">
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      movies: [],
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
  methods: {
    getMovies () {
      axios.get(`http://api.tvmaze.com/shows?page=${this.currentPage - 1}`)
        .then(response => {
          console.log(response)
          this.movies = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
