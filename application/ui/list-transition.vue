<template>
  <transition-group
    appear
    name="list-transition"
    :tag="tag"
    :css="false"
    @enter="enter"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
import anime from 'animejs'

const ANIM_DURATION = 1100
const ANIM_DELAY = 500

export default {
  name: `list-transition`,
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  methods: {
    enter(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: ANIM_DURATION,
        delay: el.dataset.index * ANIM_DELAY,
        complete: done,
      })
    },
  },
}
</script>
