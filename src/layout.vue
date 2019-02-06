<script>
import theNavigation from '~/components/the-navigation'

export default {
  name: `layout`,
  components: {
    'thaime-navigation': theNavigation,
  },
}
</script>

<template lang="pug">
main
  thaime-navigation
  transition(name="page" mode="out-in")
    router-view
  notifications(classes="thaime-notifications" position="bottom center")
</template>

<style lang="scss">
@import '~/css-vars';
@import '~@hiswe/focus-ring/dist/focus-ring.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  // Prevent font scaling in landscape while allowing user zoom
  -webkit-text-size-adjust: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  // http://markdotto.com/2018/02/07/github-system-fonts/
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 18px;
  color: var(--c-text);
  background: var(--c-primary-white);
}
main {
  min-height: calc(100vh - var(--vh-offset));
  width: 100%;
  overflow: hidden;
}
.page-content {
  flex: 1 0 auto;
}
.thai-text {
  font-size: 1.1em;
}
.svg-symbol {
  fill: currentColor;
}

// override default notification styling
// https://github.com/euvl/vue-notification/blob/master/demo/src/App.vue#L267-L287
.notification.thaime-notifications {
  margin: 1rem;
  margin-bottom: 0;
  border-radius: 0.25em;
  text-align: center;
  padding: 10px 20px;
  color: var(--c-text);
  background: var(--c-accent-lighter);
  border: 0;
  box-shadow: 0 0 15px 0 var(--c-primary);
}
// prevent zooming on double-tap
// https://stackoverflow.com/questions/46167604/iphone-html-disable-double-tap-to-zoom
button {
  touch-action: manipulation;
}

.page-enter-active,
.page-leave-active {
  transition-duration: var(--page-transition);
}

.page-enter-active {
  transition-delay: var(--page-transition);
}
.page-enter-active .content-body,
.page-leave-active .content-body {
  transition-property: opacity;
  transition-duration: var(--page-transition);
}

.page-enter-active .content-body {
  transition-delay: var(--page-transition);
}

.page-enter .content-body,
.page-leave-active .content-body {
  opacity: 0;
}

.pwa-refresh-ui {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  padding: 0 calc(50% - 500px / 2);
  font-size: 18px;

  &__text,
  &__dismiss,
  &__refresh {
    margin: 0;
    padding: 0.75rem 0;
  }
  &__text {
    flex: 1 1 auto;
    padding-left: 0.5rem;
  }
  &__dismiss,
  &__refresh {
    font-size: 16px;
    background: none;
    border: 0;
    text-transform: uppercase;
    margin-left: 0.5rem;
    color: var(--c-accent);
    transition: color 0.25s, transform 0.25s;

    &:active {
      color: var(--c-accent-darker);
      transform: translateY(2px);
    }
  }
  &__refresh {
    padding-right: 0.5rem;
  }
}
</style>
