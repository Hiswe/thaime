<template>
  <section class="page-content">
    <h1>404</h1>
    <h2>nothing there</h2>
    <router-link to="/" exact>
      back to homepage
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
.page-content {
  height: calc(100vh - var(--navigation-total-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 5rem;
  font-weight: 100;
  margin: 0;
  color: var(--c-primary);
}
a {
  color: var(--c-accent);
  text-decoration: none;
}
</style>
