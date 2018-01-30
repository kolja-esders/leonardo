<template>
  <div class="box question" @click="navToQuestion">
    <div class="content">
      <p class="is-clearfix">
      <strong class="is-size-4">{{ data.content }}</strong>
        <span class="is-pulled-right">
          <span v-if="!data.answer" class="tag is-danger">Unresolved</span>
        </span>
        <markdown-view class="md-container is-hidden-mobile" v-bind:text="data.answer" />
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
  methods: {
    navToQuestion () {
      this.$router.push(`/questions/${this.data.id}`)
    }
  }
}
</script>

<style lang="scss">
.question {
  &:hover {
    cursor: pointer;
  }

  .md-container {
    width: 100%;
  }
}
</style>
