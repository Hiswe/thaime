<template>
  <li :class="{ active: isCurrentDayOrMonth }">
    <p class="english-name">{{ dayOrMonth.en }}</p>
    <p class="thai-name">
      <span class="thai-text">{{ dayOrMonth.th }} </span>
      <small class="rtgs">{{ dayOrMonth.rtgs }}</small>
    </p>
  </li>
</template>

<style scoped>
li {
  padding: 0.25rem 0;
  display: flex;
}
p {
  margin: 0;
}
p:first-child {
  width: 6rem;
  color: var(--c-primary);
}
small {
  display: block;
  color: var(--c-text-lighter);
}
.active {
  position: relative;
}
.active::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: -0.75em;
  border-radius: 0.25em;
  background: var(--c-accent-lightest);
  z-index: -1;
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



