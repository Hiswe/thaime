<template>
  <main>
    <t-nav />
    <router-view></router-view>
  </main>
</template>

<style>
:root {
  --c-text: hsl(0, 0%, 20%);
  --c-text-lighter: hsl(0, 0%, 40%);
  --c-primary: hsl(272, 100%, 30%);
  --c-primary-lighter: hsl(272, 50%, 45%);
  --c-primary-lightest: hsl(272, 50%, 95%);
  --c-primary-contrast: white;
  --c-accent: hsl(187, 100%, 45%);
  --c-accent-lighter: hsl(187, 60%, 70%);
  --c-accent-lightest: hsl(187, 60%, 95%);
  --gutter: 1.5rem;
  --quarter-gutter: calc(var(--gutter) / 4);
  --half-gutter: calc(var(--gutter) / 2);
  --two-gutter: calc(var(--gutter) * 2);

  --border-radius-size: 0.75rem;
}
html,
body {
  margin: 0;
  padding: 0;
  /* http://markdotto.com/2018/02/07/github-system-fonts/ */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 18px;
  color: var(--c-text);
}
main {
  min-height: 100vh;
}
.page-content {
  flex: 1 0 auto;
}
h2 {
  font-weight: 300;
  text-transform: uppercase;
}
.thai-text {
  font-size: 1.1em;
}
.svg-icon {
  fill: currentColor;
}
</style>

<script>
import svgIcons from './ui/svg-icons'
import mainNav from './navigation'

export default {
  name: `layout`,
  components: {
    't-svg-icons': svgIcons,
    't-nav': mainNav,
  },
}
</script>

