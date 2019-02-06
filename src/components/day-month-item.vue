<script>
export default {
  name: `day-month-item`,
  props: {
    dayOrMonth: Object,
    isCurrentDayOrMonth: Boolean,
  },
}
</script>

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
  counter-increment: dayOrMonthlisting;

  &::before {
    content: counter(dayOrMonthlisting);
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translate(0, -50%);
    font-weight: 900;
    font-size: 5rem;
    z-index: -1;
    color: white;
    pointer-events: none;
    opacity: 0.85;
  }

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
  background: var(--c-accent);
  color: white;
  border-radius: var(--border-radius-small);

  &::before {
    color: var(--c-accent-darker);
    opacity: 0.35;
  }

  small {
    color: var(--c-primary);
  }
}
</style>
