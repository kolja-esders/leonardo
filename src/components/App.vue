<template>
  <div class="home-page container">
    <div class="columns is-multiline">
      <div v-for="q in questions" :key="q.id" v-if="!q.is_deleted" class="column is-half">
        <question :data="q"/>
      </div>
    </div>
    <add-question-form :questions="questions" init-collapsed=true mode="create" v-on:questionCreated="onQuestionCreated" />
    <div class="disclaimer has-text-centered has-text-weight-light">
      <small>© 2018 Kolja Esders</small>
    </div>
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
  created() {
    axios.get('/api/questions').then(({ data }) => {
      this.questions = data.items ? data.items : []
    })
  },
  methods: {
    onQuestionCreated(q) {
      this.questions.push(q)
    },
  }
}
</script>

<style lang="scss">
.home-page {
  padding: 1.5rem;
  color: #2c3e50;
}

.home-page, textarea, input {
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
a {
  color: #006736;

  &:hover {
    color: #006736;
  }
}

.disclaimer {
  color: #f0eafe;
}

</style>
