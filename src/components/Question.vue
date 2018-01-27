<template>
    <div class="box question">
      <div class="content">
        <p class="is-clearfix">
          <strong class="is-size-4">{{ content }}</strong>
          <span class="is-pulled-right">
            <span v-if="!answer" class="tag is-danger">Unresolved</span>
          </span>
          <span v-html="markdownAnswer"></span>
        </p>
      </div>
    </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'question',

  props: {
    content: {
      type: String
    },
    answer: {
      type: String,
      required: false,
    }
  },
  computed: {
    markdownAnswer() {
      return marked(this.answer || '');
    }
  },

}
</script>


<style lang="scss">
</style>
