<template>
    <div class="box question">
      <div class="content">
        <p class="is-clearfix">
          <router-link :to="`/questions/${data.id}`"><strong class="is-size-4">{{ data.content }}</strong></router-link>
          
          <span class="is-pulled-right">
            <span v-if="!answer" class="tag is-danger">Unresolved</span>
          </span>
          <markdown-view class="md-container" v-bind:text="data.answer" />
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
    data: {
      type: Object,
    }
  },
}
</script>

<style lang="scss">
.question {
  .md-container {
    width: 100%;
  }
}
</style>
