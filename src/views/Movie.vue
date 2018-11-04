<template>
<b-container v-if="show" class="mb-4">
  <b-row>
    <b-col cols="12" sm="4">
  <movieCard v-bind:movie="movie"/>
  </b-col>
  <b-col cols="12" sm="8">
      <b-list-group>
  <b-list-group-item><b>Name:</b> {{movie.name}}</b-list-group-item>
  <b-list-group-item><b>Language:</b> {{movie.language}}</b-list-group-item>
  <b-list-group-item><b>Status:</b> {{movie.status}}</b-list-group-item>
  <b-list-group-item v-b-toggle.collapse1>
   <b>Genres:</b>
    <b-badge variant="primary" class="ml-2" pill>{{movie.genres.length}}</b-badge>
      <b-collapse visible id="collapse1" class="mt-2">
    <b-card bg-variant="light" v-for="genre in movie.genres" :key="genre.id">
      <p class="card-text"> {{genre}}</p>
    </b-card>
    </b-collapse>
    </b-list-group-item>
  <b-list-group-item>
    <b>Premiere date:</b> {{movie.premiered}}
    </b-list-group-item>
    <b-list-group-item>
    <b>Rating</b>
    <b-badge variant="primary" class="ml-2" pill>{{movie.rating.average}}</b-badge>
    <b-progress :value="movie.rating.average * 10" variant="primary" :striped="striped" class="mb-2 mt-2"></b-progress>
    </b-list-group-item>
    <b-list-group-item >
      <b-container class="text-center ">
      <b-btn v-b-toggle.collapseMore class="text-center" variant="primary">More information</b-btn>
      </b-container>
        <b-collapse id="collapseMore" class="mt-2">
     <moreInfo  v-bind:movie="movie"/>
        </b-collapse>
    </b-list-group-item>
</b-list-group>
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
import movieCard from '../components/movieCard.vue'
import moreInfo from '../components/moreInfoMovie.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      striped: true,
      show: false
    }
  },
  components: {
    movieCard,
    moreInfo
  },
  created () {
    this.getMovie()
  },
  computed: {
    movie () {
      return this.$store.state.movies
    }
  },
  watch: {
    movie (val) {
      debugger
      if (val) {
        this.show = true
      } else {

      }
    }
  },
  methods: {
    getMovie () {
      this.$store.dispatch('getMovies', `shows/${this.id}`)
    }
  }
}
</script>
