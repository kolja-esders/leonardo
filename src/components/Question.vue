<template>
    <div class="box question">
      <div class="content">
        <p class="is-clearfix">
          <strong class="is-size-4">{{ content }}</strong>
          <span class="is-pulled-right">
            <span v-if="!answer" class="tag is-danger">Unresolved</span>
          </span>
          <markdown-view v-bind:text="answer" />
        </p>
      </div>
    </div>
</template>

<script>
import MarkdownView from './MarkdownView.vue'
import marked from 'marked';

export default {
  name: 'question',
  components: {
    MarkdownView
  },
  props: {
    content: {
      type: String
    },
    answer: {
      type: String,
      required: false,
    }
  },
}
</script>


<style lang="scss">
</style>
