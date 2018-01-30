<template>
  <div class="home-page container">
    <question :data="{content: 'test', id: 100}" />
    <div class="columns is-multiline">
      <div v-for="q in questions" :key="q.id" class="column is-half">
        <question :data="q" />
      </div>
    </div>
    <add-question-form :questions="questions" init-collapsed=true mode="create" />
  </div>
</template>

<script>
import Question from './Question.vue'
import AddQuestionForm from './AddQuestionForm.vue'
import axios from 'axios';

export default {
  name: 'app',
  components: { Question, AddQuestionForm },
  data () {
    return {
      questions: []
    }
  },
  created () {
    axios.get('/api/questions').then(({ data }) => {
      this.questions = data.items ? data.items : []
    })
  },
}
</script>

<style lang="scss">
.home-page {
  padding: 3rem 0;
  color: #2c3e50;
}

.home-page, textarea, input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: radial-gradient(ellipse at top left, #137F4B 0%, #006736 100%) no-repeat;
  min-height: 100vh;
  margin: 0;
}
a {
  color: #006736;

  &:hover {
    text-decoration: underline;
    color: #006736;
  }
}
</style>
