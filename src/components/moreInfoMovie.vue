<template>
            <b-list-group>
  <b-list-group-item><b>Channel:</b> {{movie.network.name}}</b-list-group-item>
  <b-list-group-item><b>Country:</b> {{movie.network.country.name}}</b-list-group-item>
  <b-list-group-item><b>Summary:</b> <p class="text-justify " v-html='this.movie.summary'></p></b-list-group-item>
            </b-list-group>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
