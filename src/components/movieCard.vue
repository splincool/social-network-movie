<template>
  <b-card :title="movie.name"
    :img-src="movie.image.medium"
    :img-alt="movie.name"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2">
     <div slot="footer">
        <small class="text-muted">Last updated {{dateConverter()}} </small>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  methods: {
    dateConverter () {
      var Time = new Date(this.movie.updated * 1000)
      return Time.toString()
    }
  }
}
</script>
