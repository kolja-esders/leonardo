<template>
  <section class="is-clearfix box add-question-form" :class="{ collapsed: collapsed }">
    <div class="top-container">
      <input class="is-size-4 has-text-weight-bold" type="text" @focus="unroll()" placeholder="Why is Leonardo da Vinci so..." v-model.trim="question.content">
    </div>
    <div v-if="!collapsed">
      <hr>
      <div>
        <div class="is-hidden-tablet">
          <textarea v-show="!isPreview" class="markdown-in" placeholder="The answer is obviously..." @input="update" v-model.trim="question.answer"></textarea>
          <markdown-view v-show="isPreview" class="mobile-preview" :text="question.answer" />
        </div>
        <div class="is-hidden-mobile">
          <textarea class="markdown-in" placeholder="The answer is obviously..." @input="update" v-model.trim="question.answer"></textarea>
          <markdown-view class="is-pulled-right desktop-preview" :text="question.answer" />
        </div>
      </div>
      <span class="is-hidden-tablet">
        <span v-if="isPreview" class="preview-toggle" @click="togglePreview">Show source</span>
        <span v-else class="preview-toggle" @click="togglePreview">Show preview</span>
      </span>
      <button v-if="mode === 'update'" class="button ask-btn is-pulled-right" v-on:click="createQuestion">Update</button>
      <button v-if="mode === 'create'" class="button ask-btn is-pulled-right" v-on:click="createQuestion">Create</button>
    </div>
  </section>
</template>

<script>
import MarkdownView from './MarkdownView.vue'
import _ from 'lodash';
import marked from 'marked';
import axios from 'axios';

export default {
  data() {
    return {
      collapsed: true,
      isPreview: false
    }
  },
  components: {
    MarkdownView
  },
  props: {
    questions: {
      type: Array,
      default: [],
      required: false
    },
    question: {
      type: Object,
      default: {},
      required: false
    },
    initCollapsed: {
      type: Boolean,
      required: false
    },
    mode: {
      type: String,
      validator: v => {
        return v === 'update' || v === 'create'
      }
    }
  },
  mounted: function(){
    this.collapsed = this.initCollapsed
  },
  methods: {
    update: _.debounce(function (e) {
      this.question.answer = e.target.value
    }, 10),
    unroll() {
      this.collapsed = false
    },
    togglePreview() {
      this.isPreview = !this.isPreview
    },
    createQuestion: function() {
      if (!this.question.content) {
          this.question = {}
          return
      }

      if (this.mode === 'update') {
        axios.put(`/api/questions/${this.question.id}`, this.question).then(resp => {
          let success = resp.data
          if (success) {
            this.$toast.open({
              message: 'Successfully updated question.',
              position: 'is-bottom',
              type: 'is-success'
            })
          } else {
            this.$toast.open({
              message: 'Unable to update question. Try again later.',
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        });
      } else if (this.mode === 'create') {
        axios.post('/api/questions', this.question).then(({ created }) => {
          if (!this.question.id) {
            this.question.id = created
          }
          this.questions.push(this.question)
          //this.question = {}
          //this.collapsed = true
        });
      }

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

  .mobile-preview {
    min-height: 150px;
  }

  .desktop-preview {
    width: 50%;
  }

  hr {
    margin: 1.25rem 0;
  }

  .markdown-in {
    width: 50%;
    color: #4a4a4a;
    padding-right: 1.25rem;
  }

  .is-hidden-tablet {
    .markdown-in {
      width: 100%;
      padding-right: 0;
    }
  
  }

  .preview-toggle {
    cursor: pointer;
    color: #888;
    line-height: 36px;
  }

}
</style>
