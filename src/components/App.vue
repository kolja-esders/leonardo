<template>
  <div id="app">
    <!--<img class="leonardo" src="../assets/leonardo.png">-->
    <question/>
    <question/>
    <question/>
  </div>
</template>

<script>
import Question from './Question.vue'

export default {
  name: 'app',
  components: { Question },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3rem;
}

.leonardo {
  display: block;
  margin: 0 auto;
  width: 200px;
  margin-bottom: 3rem;
  border-radius: 100px;
  transition: 0.8s;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    transition: 0.2s;
  }
}

body {
  background: radial-gradient(ellipse at top left, #137F4B 0%, #006736 100%) no-repeat;
  min-height: 100vh;
  margin: 0;
}

h1 {
  font-size: 4rem;
  margin-top: 1rem;
  margin-top: 3rem;
  color: #242628;
}

h1, h2 {
  font-weight: 900;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
