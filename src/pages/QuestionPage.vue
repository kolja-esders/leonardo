<template>
  <div class="question-page container">
    <add-question-form :question="question" mode="update" />
  </div>
</template>

<script>
import AddQuestionForm from '../components/AddQuestionForm.vue'
import axios from 'axios';

export default {
  name: 'question-page',
  data () {
    return {
      question: {}
    }
  },
  components: { AddQuestionForm },
  created () {
    axios.get(`/api/questions/${this.$route.params.id}`).then(resp => {
      this.question = resp.data
    });
  },
}
</script>

<style lang="scss">

.question-page {
  padding: 1.5rem;
  color: #2c3e50;
}

.question-page, textarea, input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

textarea, input {
  line-height: 1.5;
}

body {
  background: radial-gradient(ellipse at top left, #137F4B 0%, #006736 100%) no-repeat;
  min-height: 100vh;
  margin: 0;
}
</style>
