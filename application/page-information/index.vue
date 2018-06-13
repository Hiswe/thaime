<template>
  <section class="page-content">
    <t-page-title title="about thaime"></t-page-title>
    <div class="categories">
      <t-category title="share the app">
        <p style="margin-top: 0">
          The app can be shared with this link
        </p>
        <p>
          <a class="link" :href="homepage">{{ homepage }}</a>
        </p>
        <p>
          <button
            type="button"
            v-clipboard:copy="homepage"
            v-clipboard:success="onCopy"
          >
            Copy to clipboard
          </button>
        </p>
        <t-icon class="qrcode" name="thaime-qrcode"></t-icon>
      </t-category>
      <t-category title="Author & suggestions">
        <h3>
            brought to you by
            <strong>Yannick “Hiswe” Aïvayan</strong>
        </h3>
        <p>
          find me on
        </p>
        <ul class="social">
          <li>
            <a href="https://github.com/hiswe" target="_blank">
              <t-icon name="c-github"></t-icon>
              <small>github</small>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/hiswehalya" target="_blank">
              <t-icon name="c-twitter"></t-icon>
              <small>twitter</small>
            </a>
          </li>
          <li>
            <a href="https://hiswe.github.com" target="_blank">
              <t-icon name="ballot"></t-icon>
              <small>my blog</small>
            </a>
          </li>
          <li>
            <a href="https://medium.com/@hiswehalya" target="_blank">
              <t-icon name="c-medium"></t-icon>
              <small>medium</small>
            </a>
          </li>
        </ul>
        <p>Suggestions can be send by:</p>
        <ul class="list">
          <li>using the form on <a class="link" href="http://www.hiswe.net/contact" target="_blank">hiswe.net</a></li>
          <li>creating a ticket on <a class="link" href="https://github.com/Hiswe/thaime/issues" target="_blank">the github repo</a></li>
        </ul>
      </t-category>
      <t-category title="other app">
        <p style="margin-top: 0">
          Thailpha is your pocket Thai Alphabet dictionnary!
        </p>
        <p>
          <a href="https://thailpha-3e7f6.firebaseapp.com/" target="_blank">
            <t-icon name="c-thailpha"></t-icon>
          </a>
        </p>
      </t-category>
      <t-category title="Source & ressources">
        <ul class="list">
          <li>
            Information provided by
            <a class="link" href="http://thai-language.com" target="_blank" >thai-language.com</a>
          </li>
          <li>
            Icons from
            <a class="link" href="https://material.io/icons" target="_blank" >Google Material Icon</a>
          </li>
          <li>
            QR Code by
            <a class="link" href="http://goqr.me/#t=url" target="_blank" >QR Code Generator</a>
          </li>
        </ul>
      </t-category>
    </div>
    <footer>v{{version}}</footer>
  </section>
</template>

<style lang="scss" scoped>
@import '../config';

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
  --svg-icon-scale: 1.75;

  li {
    display: inline-block;
    padding: 0 0.75em;
  }
  a {
    text-decoration: none;
    color: var(--c-accent-darker);
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
  --svg-icon-scale: 0.65;
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

<script>
import pkg from '../../package.json'

export default {
  name: `page-information`,
  data() {
    return {
      version: pkg.version,
      homepage: pkg.homepage,
    }
  },
  methods: {
    onCopy() {
      this.$notify(`copied!`)
    },
  },
}
</script>
