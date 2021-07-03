<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  //background-color: #ffffffff;
}
</style>

<script>
export default {
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6;margin:0px')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
}

</script>
