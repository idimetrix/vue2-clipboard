# vue2-clipboard

A simple vuejs 2 binding for clipboard.js

## Install

`npm install --save vue2-clipboard`

## Usage

For vue-cli user:

```javascript
import Vue from 'vue'
import VueClipboard from 'vue2-clipboard'

Vue.use(VueClipboard)
```

For standalone usage:

```html
<script src="vue.min.js"></script>
<!-- must place this line after vue.js -->
<script src="dist/vue2-clipboard.umd.min.js"></script>
```

## Sample

```html
<div id="app"></div>

<template id="tpl">
    <div @click="clickHandler1">Click 1</div>
    <div
      @click="clickHandler2"
      v-clipboard="text"
      v-clipboard:success="clipboardSuccessHandler"
      v-clipboard:error="clipboardErrorHandler"
    >
      Click 2
    </div>
</template>

<script>
new Vue({
  el: '#app',
  template: '#tpl',
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
})
</script>
```

## License

MIT