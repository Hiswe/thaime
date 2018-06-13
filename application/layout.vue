<template>
  <main>
    <t-nav></t-nav>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@import './css-vars';

*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  // Prevent font scaling in landscape while allowing user zoom
  -webkit-text-size-adjust: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  // http://markdotto.com/2018/02/07/github-system-fonts/
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 18px;
  color: var(--c-text);
  background: var(--c-primary-white);
}
main {
  min-height: calc(100vh - var(--vh-offset));
}
.page-content {
  flex: 1 0 auto;
}
.thai-text {
  font-size: 1.1em;
}
.svg-icon {
  fill: currentColor;
}
// prevent zoomin on double-tap
// https://stackoverflow.com/questions/46167604/iphone-html-disable-double-tap-to-zoom
button {
  touch-action: manipulation;
}

// remove focus ring until a user press tab
// https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
body:not(.user-is-tabbing) {
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }
}
</style>

<script>
import mainNav from './navigation'

export default {
  name: `layout`,
  components: {
    't-nav': mainNav,
  },
}
</script>

