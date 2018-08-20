<template lang="pug">
li.calendar-item(:class="{ active: isCurrentDayOrMonth }")
  p.calendar-item__name.calendar-item__name--english.english-name {{ dayOrMonth.en }}
  p.calendar-item__name.calendar-item__name--thai.thai-name
    span.rtgs {{ dayOrMonth.rtgs }}
    small.thai-text {{ dayOrMonth.th }}
</template>

<style scoped lang="scss">
.calendar-item {
  padding: 0.5rem;

  &__name {
    margin: 0;

    &--english {
      color: var(--c-primary);
    }
    small,
    &--thai {
      margin-top: 0.25rem;
    }
  }
  small {
    display: block;
    color: var(--c-text-lighter);
  }
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



