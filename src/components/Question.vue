<template>
  <div class="container">
    <p>test</p>
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
.container {
  padding: .5rem 1.5rem .5rem 1.5rem;
  background-color: #f0f0f0ff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  margin-bottom: 1rem;
}
</style>
