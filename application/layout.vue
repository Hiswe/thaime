<template>
  <main>
    <ul>
      <li>
        <router-link to="/" exact>time</router-link>
      </li>
      <li>
        <router-link to="/calendar">date</router-link>
      </li>
      <li>
        <router-link to="/day-month">days & months</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </main>
</template>

<style>
:root {
  --navigation-height: 50px;
  --c-primary: hsl(272, 100%, 31%);
  --c-primary-lighter: hsl(272, 50%, 45%);
  --c-primary-contrast: white;
}
html,
body {
  margin: 0;
  padding: 0;
  /* http://markdotto.com/2018/02/07/github-system-fonts/ */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
main {
  min-height: 100vh;
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
export default {
  name: `layout`,
}
</script>

