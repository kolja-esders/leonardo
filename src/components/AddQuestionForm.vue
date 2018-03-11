<template>
  <div class="add-question-form">
    <section class="is-clearfix box add-question-form" :class="{ collapsed: collapsed }">
      <div class="is-hidden-tablet">
        Not optimized for mobile yet.
      </div>
      <div class="desktop is-hidden-mobile is-clearfix">
        <div class="src is-pulled-left">
          <input class="is-size-5 content-edit" type="text" @focus="unroll()" placeholder="Why is Leonardo da Vinci so..." v-model.trim="data.content">
          <div class="editor-container" v-if="!collapsed">
            <hr />
            <textarea placeholder="The answer is obviously..." @input="update" v-model.trim="data.answer"></textarea>
          </div>
        </div>
        <div class="preview is-pulled-right">
          <div class="markdown-container" v-if="!collapsed">
            <markdown-view class="markdown" :text="data.answer" />
            <div class="controls-container">
              <div class="is-pulled-right" @click="del">
                <b-icon icon="delete is-pulled-right" v-if="mode === 'update'" class="delete-icon"></b-icon>
                <a :class="{ 'is-loading': isLoading }" class="button is-outlined is-success is-pulled-right" @click="process"><span v-if="mode === 'update'">Update question</span><span v-if="mode === 'create'">Create question</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="is-hidden-tablet mobile-buttons">
      <a class="button is-light is-outlined back-button"><b-icon icon="chevron-left" /></a>
      <a class="button is-success action-button"><span v-if="mode === 'update'">Update</span><span v-if="mode === 'create'">Create</span></a>
    </div>
  </div>
</template>

<style lang="scss">
.add-question-form {
  padding: 0;

  &.collapsed {
    padding: 1.25rem;
    background-color: #18a561;

    input {
      background-color: rgba(0, 0, 0, 0);

      &::placeholder {
          color: rgba(255, 255, 255, 0.8);
          opacity: 1;
      }
    }

    .desktop {
      height: auto;

      .src {
        width: 100%;
      }

      .src, .preview {
        padding: 0;
        height: auto;
      }
    }
  }

  .desktop {
    height: 500px;

    .src, .preview {
      width: 50%;
      height: 100%;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
    }

    .preview {
      background-color: #f0f0f0;
      border-radius: 0 5px 5px 0;
    }

    .editor-container, .markdown-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .editor-container hr {
      margin: 0.5rem 0 1.25rem 0;
    }
  }

  .controls-container {
    padding-top: 1.25rem;
  }

  .content-edit {
    width: 100%;
  }

  .delete-icon {
    margin: 0 0.5rem;
    color: rgb(117, 117, 117);
    cursor: pointer;

    i {
      position: relative;
      top: calc(50% - 6px);
    }

    &:hover {
      color: #4a4a4a;
    }
  }
  
  .mobile-buttons {
    display: flex;
    flex-orientation: row;
    margin-bottom: 1.25rem;
  
    .button.back-button, .button.action-button {
      flex-grow: 1;
      flex-basis: 0;
    }

    .button.back-button {
      color: rgba(255, 255, 255, 0.7);
      border-color: rgba(255, 255, 255, 0.7);
      margin-right: 1.25rem;

      &:hover {
        background-color: transparent;
        color: whitesmoke;
        border-color: whitesmoke;
      }
    }

    .button.action-button {
    }
  }



  .ask-btn {
    background-color: #18a561;
    color: rgba(255, 255, 255, 0.8);
  }

  .edit-container {
    padding-bottom: 1.25rem;
  }

  input, textarea {
    padding: 0;
    border: 0;
    outline: none;
    line-height: 1.5;
    width: 100%;
  }

  .markdown {
    flex-grow: 1;
    overflow-y: scroll;
  }

  textarea {
    color: #4a4a4a;
    resize: none;
    font-size: 1rem;
    word-wrap: break-word;
    flex-grow: 1;
  }

  .mobile-preview {
    height: 200px;
    overflow-y: scroll;
  }

  .desktop-preview {
    width: 50%;
    background-color: #efefef;
    height: 200px;
  }

  hr {
    margin: 1.25rem 0;
  }

  .markdown-in {
    width: 50%;
    color: #4a4a4a;
    padding-right: 1.25rem;
    font-size: 1rem;
    word-wrap: break-word;
  }

  .mobile-container {
    height: 200px;
  }

  .is-hidden-tablet {
    .markdown-in {
      width: 100%;
      padding-right: 0;
    }
  
  }

  .preview-toggle {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    cursor: pointer;
    color: #888;
    line-height: 36px;
    user-select: none;
  }
}

// Overwrite Buefy style for toasts.
.notices .toast {
  margin: 1.5rem 0;
}
</style>

<script>
import MarkdownView from './MarkdownView.vue'
import _ from 'lodash';
import marked from 'marked';
import axios from 'axios';

export default {
  data() {
    return {
      collapsed: true,
      isPreview: false,
      isLoading: false,
      data: {}
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
      default: {
        content: '',
        answer: '',
        is_deleted: false
      },
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
  watch: {
    question() {
      this.data = this.question
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.data.answer = e.target.value
    }, 10),
    unroll() {
      this.collapsed = false
    },
    togglePreview() {
      this.isPreview = !this.isPreview
    },
    del() {
      this.data.is_deleted = true
      axios.put(`/api/questions/${this.data.id}`, this.data).then(resp => {
        let success = resp.data
        if (success) {
          this.$router.replace(`/`)
        }
      });
    },
    process() {
      if (this.isLoading) {
        return
      } else if (!this.data.content) {
        this.data = {}
        return
      }
      this.isLoading = true

      if (this.mode === 'update') {
        axios.put(`/api/questions/${this.data.id}`, this.data).then(resp => {
          this.isLoading = false
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
        axios.post('/api/questions', this.data).then(({ data }) => {
          this.isLoading = false
          if (!this.data.id) {
            this.data.id = data.created
          }
          this.data.is_deleted = false
          this.$emit('questionCreated', this.data)
          this.data = {}
          this.collapsed = true
        });
      }
    },
  }
}
</script>

