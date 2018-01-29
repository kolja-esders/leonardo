<template>
  <section class="is-clearfix box add-question-form" v-bind:class="{ collapsed: collapsed }">
    <div class="top-container">
      <input class="is-size-4 has-text-weight-bold" type="text" @focus="unroll()" placeholder="Ask question..." v-model.trim="newQuestion.content">
    </div>
    <div v-if="!collapsed">
      <hr>
      <div>
        <textarea class="markdown-in" placeholder="Answer" @input="update" v-model.trim="newQuestion.answer"></textarea>
        <markdown-view class="is-pulled-right" :text="input" />
      </div>
      <button class="button ask-btn is-pulled-right" v-on:click="createQuestion">Submit</button>
    </div>
  </section>
</template>

<script>
import MarkdownView from './MarkdownView.vue'
import _ from 'lodash';
import marked from 'marked';
import axios from 'axios';

export default {
  data () {
    return {
      input: '',
      collapsed: true,
      newQuestion: {},
    }
  },
  components: {
    MarkdownView
  },
  props: {
    questions: []
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 10),
    unroll() {
      this.collapsed = false;
    },
    createQuestion: function() {
      if (!this.newQuestion.content) {
          this.newQuestion = {}
          return
      }

      axios.put('/api/questions', this.newQuestion).then(({ created }) => {
        this.newQuestion.id = created
        this.questions.push(this.newQuestion)
        this.newQuestion = {}
        this.input = ''
        this.collapsed = true
        console.log(this.newQuestion)
      });
    },
  }
}
</script>

<style lang="scss">

.add-question-form {
  &.collapsed {
    background-color: #18a561;

    input {
      background-color: rgba(0, 0, 0, 0);

      &::placeholder {
          color: rgba(255, 255, 255, 0.8);
          opacity: 1;
      }
    }
  }

  .top-container {
    display: flex;
    flex-direction: row;

    input {
      flex: 1;
      color: rgb(54, 54, 54);
    }
  }

  .ask-btn {
    background-color: #18a561;
    color: rgba(255, 255, 255, 0.8);
  }

  input, textarea {
    padding: 0;
    outline: none;
    border: 0;
  }

  textarea {
    font-size: 1rem;
    resize: none;
    min-height: 150px;
    max-height: 100%;
  }

  hr {
    margin: 1.25rem 0;
  }

  .markdown-in {
    width: 50%;
    color: #4a4a4a;
    padding-right: 1.25rem;
  }

}
</style>
