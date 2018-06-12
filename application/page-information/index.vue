<template>
  <section class="page-content">
    <t-page-title>
      about thaime
    </t-page-title>
    <t-category title="share the app">
      <p>
        The app can be shared with this link
      </p>
      <p>
        <a class="link" :href="homepage">{{ homepage }}</a>
      </p>
      <p>
        <button type="button" v-clipboard:copy="homepage">
          Copy to clipboard
        </button>
      </p>
    </t-category>
    <!-- <t-category title="share the app">
      <p>
        <CopyToClipboard text={ state.appLink }>
          <button className="btn">Copy to clipboard</button>
        </CopyToClipboard>
      </p>
      <p>or this QR code</p>
      <Icon svgId="thailpha-firebase" />
    </t-category> -->
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
      </ul>
    </t-category>
    <footer>v{{version}}</footer>
  </section>
</template>

<style lang="scss" scoped>
.page-content {
  padding-bottom: var(--navigation-total-height);
}
header + .category {
  padding-top: 0;
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
  padding: 0.5em 1em;
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
}
</script>
