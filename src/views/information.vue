<script>
import copy from 'copy-to-clipboard'

import pkg from '../../package.json'

const SHARE_API = typeof navigator.share === `function`
const __APP_TITLE__ = pkg.name
const __APP_DESC__ = pkg.description
const __APP_URL__ = pkg.homepage

export default {
  name: `page-information`,
  data() {
    return {
      version: pkg.version,
      homepage: pkg.homepage,
    }
  },
  computed: {
    homepageNoProtocol() {
      return this.homepage.replace(`https://`, ``)
    },
  },
  methods: {
    onCopy() {
      this.notifyCopy()
    },
    share() {
      if (SHARE_API) return this.shareWithApi()
      this.copyToClipboard()
    },
    shareWithApi() {
      const shareOptions = {
        title: __APP_TITLE__,
        text: __APP_DESC__,
        url: __APP_URL__,
      }
      navigator.share(shareOptions).catch(() => this.copyToClipboard())
    },
    copyToClipboard() {
      copy(__APP_URL__)
      this.$notify(`Application link copied!`)
    },
  },
}
</script>

<template lang="pug">
section.page-content
  t-page-title(title="about thaime")
  thaime-list-transition.categories.content-body(tag="div")
    t-category.category--share(
      key="share-the-app"
      title="share the app"
      :data-index="1 / 4"
    )
      p(style="margin-top: 0"): button(
        type="button"
        @click="share"
      ) Share <i>Thaime</i>!
      p or copy this url
      p: span.link(@click="copyToClipboard") {{ homepageNoProtocol }}
      p or use this qrcode
      t-icon.qrcode(name="thaime-qrcode" :scale="0.65")
    t-category(
      key="author-suggestions"
      title="Author & suggestions"
      :data-index="2 / 4"
    )
      h3
        | brought to you by
        strong Yannick “Hiswe” Aïvayan
      p find me
      ul.social
        li: a(href="http://hiswe.net" target="_blank" rel="noreferrer noopener")
          t-icon(name="web" :scale="2")
          small website
        li: a(href="https://github.com/hiswe" target="_blank" rel="noreferrer noopener")
          t-icon(name="c-github" :scale="1.75")
          small github
        li: a(href="https://hiswe.github.com" target="_blank" rel="noreferrer noopener")
          t-icon(name="ballot" :scale="2")
          small blog
        li: a(href="https://medium.com/@hiswehalya" target="_blank" rel="noreferrer noopener")
          t-icon(name="c-medium" :scale="1.5")
          small medium
        li: a(href="https://twitter.com/hiswehalya" target="_blank" rel="noreferrer noopener")
          t-icon(name="c-twitter" :scale="1.75")
          small twitter 
      p Suggestions can be send by:
      ul.list
        li using the form on <a class="link" href="http://www.hiswe.net/contact" target="_blank" rel="noreferrer noopener">hiswe.net</a>
        li creating a ticket on <a class="link" href="https://github.com/Hiswe/thaime/issues" target="_blank" rel="noreferrer noopener">the github repo</a>

    t-category(
      key="other-app"
      title="other app"
      :data-index="3 / 4"
    )
      p(style="margin-top: 0")
        | <strong>Thailpha</strong>a pocket Thai alphabet dictionnary
      p: a(href="https://thailpha-3e7f6.firebaseapp.com/" target="_blank" rel="noreferrer noopener")
        t-icon(name="c-thailpha")

    t-category(
      key="source-ressources"
      title="Source & ressources"
      :data-index="4 / 4"
    )
      ul.list
        li
          | Information provided by
          |
          a.link(href="http://thai-language.com" target="_blank" rel="noreferrer noopener") thai-language.com
        li
          | Icons from
          |
          a.link(href="https://material.io/icons" target="_blank" rel="noreferrer noopener") Google Material Icon
        li
          | QR Code by
          |
          a.link(href="http://goqr.me/#t=url" target="_blank" rel="noreferrer noopener") QR Code Generator
  footer v{{version}}
</template>

<style lang="scss" scoped>
@import '~/config';

.page-content {
  padding-bottom: var(--navigation-total-height);
}
.categories {
  @media #{$mq-small} {
    .category:first-child {
      padding-top: 0;
    }
  }
  @media #{$mq-big} {
    display: grid;
    grid-gap: 0 var(--gutter);
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
    margin: 0 auto;
  }
}
.category--share::before {
  display: none;
}
h3 {
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
}
.social {
  text-align: center;
  list-style: none;
  padding: 0;
  display: flex;

  li {
    flex: 1 0 20%;
    padding: 0;
    display: flex;
  }
  a {
    flex: 1 1 auto;
    text-decoration: none;
    color: var(--c-accent-darker);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .svg-symbol {
    margin: auto 0;
  }
  small {
    display: block;
    padding-top: 0.25rem;
    color: var(--c-primary-lighter);
  }
}
.qrcode {
  color: var(--c-primary-darker);
  text-align: center;
  display: block;
  margin: 0 auto;
}
p {
  text-align: center;
}
strong {
  display: block;
  padding-top: 0.25rem;
}
.link {
  text-decoration: none;
  color: var(--c-text);
  box-shadow: inset 0 -0.08em var(--c-accent-lighter),
    0 0.08em var(--c-accent-lighter);
}
.list {
  line-height: 1.35;
  max-width: 400px;
  margin: 0 auto;
}
footer {
  text-align: center;
  padding-top: var(--half-gutter);
  color: var(--c-primary-lightest);
}
button {
  border: 0;
  background: var(--c-accent);
  font: inherit;
  padding: 0.75em 1.5em;
  border-radius: var(--border-radius-small);
  transition: transform 0.25s, background-color 0.25s;

  &:active {
    background: var(--c-accent-lightest);
    transform: translateY(5px);
  }
}
</style>
