<template>
  <div id="app">
    <div @click="clickHandler1" class="item1">Click 1</div>
    <div
      @click="clickHandler2"
      v-clipboard="text"
      v-clipboard:success="clipboardSuccessHandler"
      v-clipboard:error="clipboardErrorHandler"
      class="item2"
    >
      Click 2
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      text: "I LOVE vue2-clipboard directive!!!"
    };
  },
  methods: {
    clickHandler1() {
      this.$clipboard(this.text);
    },
    clickHandler2() {},
    clipboardSuccessHandler() {
      console.log("clipboardSuccessHandler");
    },
    clipboardErrorHandler() {
      console.log("clipboardErrorHandler");
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  .item1 {
    background: #3c3b6e;
    padding: 2.5rem;
    margin: 2.5rem;
  }
  .item2 {
    background: #b22234;
    padding: 2.5rem;
    margin: 2.5rem;
  }
}
</style>
