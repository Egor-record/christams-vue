<template lang="pug">
  #app
    catalog
</template>

<script>


import Catalog from './catalog.vue'

export default {
  name: 'app',
  data () {
      return {}
  },
  components: {
    'catalog': Catalog
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


</style>
