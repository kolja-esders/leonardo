<template>
    <div class="box question">
      <div class="content">
        <p>
        <strong class="is-size-4">{{ content }}</strong>
        <span class="is-pulled-right">
          <span v-if="!answer" class="tag is-danger">Unresolved</span>
        </span>
          <br>
          {{ answer }}
        </p>
      </div>
    </div>
</template>

<script>
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
  }

}
</script>


<style lang="scss">
</style>
