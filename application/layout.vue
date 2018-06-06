<template>
  <main>
    <ul>
      <li>
        <router-link to="/" exact>
          <t-svg-icons name="access-time"/>
        </router-link>
      </li>
      <li>
        <router-link to="/calendar">
          <t-svg-icons name="insert-invitation"/>
        </router-link>
      </li>
      <li>
        <router-link to="/information">
          <t-svg-icons name="info"/>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </main>
</template>

<style>
:root {
  --navigation-height: 50px;
  --c-text: hsl(0, 0%, 20%);
  --c-text-lighter: hsl(0, 0%, 40%);
  --c-primary: hsl(272, 100%, 30%);
  --c-primary-lighter: hsl(272, 50%, 45%);
  --c-primary-contrast: white;
  --c-accent: hsl(187, 100%, 45%);
  --c-accent-lighter: hsl(187, 60%, 70%);
  --c-accent-lightest: hsl(187, 60%, 95%);
  --gutter: 1.5rem;
  --two-gutter: calc(var(--gutter) * 2);
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
section {
  padding: var(--gutter);
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

<style scoped>
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--c-primary);
}
a {
  height: var(--navigation-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2em;
  text-decoration: none;
  color: var(--c-primary-contrast);
}
.router-link-active {
  background: var(--c-primary-lighter);
}
</style>

<script>
import svgIcons from './svg-icons'
export default {
  name: `layout`,
  components: {
    't-svg-icons': svgIcons,
  },
}
</script>

