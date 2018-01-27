<template>
    <div class="box question">
      <div class="content">
        <p>
        <strong class="is-size-4">Why is everybody looking at the babies of strangers all the time?</strong>
        <span class="is-pulled-right">
          <span class="tag is-danger">Unresolved</span>
        </span>
          <br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'question',

  props: {
    question: {
      type: String,
      required: false,
    },
  }

}
</script>


<style lang="scss">
</style>
