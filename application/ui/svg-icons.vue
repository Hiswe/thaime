<template>
<div  class="svg-icon-wrapper">
  <svg class="svg-icon svg-icon--add-circle" viewBox="0 0 24 24" :style="{'--svg-icon-scale': safeScale}" v-if="name === 'add-circle'"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
<svg class="svg-icon svg-icon--remove-circle" viewBox="0 0 24 24" :style="{'--svg-icon-scale': safeScale}" v-if="name === 'remove-circle'"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
<svg class="svg-icon svg-icon--access-time" viewBox="0 0 24 24" :style="{'--svg-icon-scale': safeScale}" v-if="name === 'access-time'"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
<svg class="svg-icon svg-icon--info" viewBox="0 0 24 24" :style="{'--svg-icon-scale': safeScale}" v-if="name === 'info'"><path d="M11 7h2v2h-2zM11 11h2v6h-2z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
<svg class="svg-icon svg-icon--insert-invitation" viewBox="0 0 24 24" :style="{'--svg-icon-scale': safeScale}" v-if="name === 'insert-invitation'"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2z"/><path d="M17 12h-5v5h5v-5z"/></svg>
<svg class="svg-icon svg-icon--restore" viewBox="0 0 24 24" :style="{'--svg-icon-scale': safeScale}" v-if="name === 'restore'"><path d="M13 3a9 9 0 0 0-9 9H1l4 3.99L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z"/><path d="M12 8v5l4.25 2.52.77-1.28-3.52-2.09V8z"/></svg>
</div>
</template>

<style>
:root {
  --svg-icon-scale: 1;
}
</style>
<style scoped>
.svg-icon--add-circle {
  width: calc(24px * var(--svg-icon-scale));
  height: calc(24px * var(--svg-icon-scale));
}
.svg-icon--remove-circle {
  width: calc(24px * var(--svg-icon-scale));
  height: calc(24px * var(--svg-icon-scale));
}
.svg-icon--access-time {
  width: calc(24px * var(--svg-icon-scale));
  height: calc(24px * var(--svg-icon-scale));
}
.svg-icon--info {
  width: calc(24px * var(--svg-icon-scale));
  height: calc(24px * var(--svg-icon-scale));
}
.svg-icon--insert-invitation {
  width: calc(24px * var(--svg-icon-scale));
  height: calc(24px * var(--svg-icon-scale));
}
.svg-icon--restore {
  width: calc(24px * var(--svg-icon-scale));
  height: calc(24px * var(--svg-icon-scale));
}

</style>

<script>
export default {
  name: `svg-icon`,
  props: {
    name: {
      default: ``,
      type: String
    },
    scale: {
      default: 1,
      type: Number
    },
  },
  computed: {
    iconName() {
      return name ? `svg-icon--${name}` : '';
    },
    safeScale() {
      return Number.isFinite( this.scale ) ? this.scale : 1;
    }
  }
}
</script>