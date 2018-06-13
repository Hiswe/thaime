<template>
  <li :class="{ active: isCurrentDayOrMonth }">
    <p class="english-name">{{ dayOrMonth.en }}</p>
    <p class="thai-name">
      <span class="thai-text">{{ dayOrMonth.th }}</span>
      <small class="rtgs">{{ dayOrMonth.rtgs }}</small>
    </p>
  </li>
</template>

<style scoped>
li {
  padding: 0.5rem;
}
p {
  margin: 0;
}
p:first-child {
  color: var(--c-primary);
}
small {
  display: block;
  color: var(--c-text-lighter);
  font-size: 0.7em;
}
.active {
  background: white;
  border-radius: var(--border-radius-small);
}
</style>

<script>
export default {
  name: `day-month-item`,
  props: {
    dayOrMonth: Object,
    isCurrentDayOrMonth: Boolean,
  },
}
</script>



