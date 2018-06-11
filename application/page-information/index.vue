<template>
  <section class="page-content">
    <t-page-title>
      about thaime
    </t-page-title>
    <t-category title="Author & suggestions">
      <h3>
          brought to you by
          <strong>Yannick “Hiswe” Aïvayan</strong>
          find me on:
      </h3>
      <p></p>
      <ul>
        <li><a href="https://hiswe.github.com">my blog</a></li>
        <li><a href="https://github.com/hiswe">github</a></li>
        <li><a href="https://twitter.com/hiswehalya">twitter</a></li>
      </ul>
      <p>Suggestions can be send by:</p>
      <ul>
        <li>using the form on <a href="http://www.hiswe.net/contact" target="_blank">hiswe.net</a></li>
        <li>creating a ticket on <a href="https://github.com/Hiswe/thaime/issues" target="_blank">the github repo</a></li>
      </ul>
    </t-category>
    <!-- <t-category title="share the app">
      <p>The app can be shared with this link </p>
      <a href={ state.appLink }>{ state.appLink }</a>
      <p>
        <CopyToClipboard text={ state.appLink }>
          <button className="btn">Copy to clipboard</button>
        </CopyToClipboard>
      </p>
      <p>or this QR code</p>
      <Icon svgId="thailpha-firebase" />
    </t-category> -->
    <t-category title="Source & ressources">
      <ul>
        <li>
          Information provided by
          <a href="http://thai-language.com" target="_blank" >thai-language.com</a>
        </li>
        <li>
          Icons from
          <a href="https://material.io/icons" target="_blank" >Google Material Icon</a>
        </li>
        <li>
          Build with
          <a href="https://vuejs.org/" target="_blank" >Vue.js</a>
          and
          <a href="https://en.parceljs.org/" target="_blank" >Parcel.js</a>
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
strong {
  display: block;
  padding-top: 0.25rem;
}
a {
  text-decoration: none;
  color: var(--c-text);
  box-shadow: inset 0 -0.08em var(--c-accent-lighter),
    0 0.08em var(--c-accent-lighter);
}
ul {
  line-height: 1.35;
}
footer {
  text-align: center;
  padding-top: var(--half-gutter);
  color: var(--c-primary-lightest);
}
</style>

<script>
import pkg from '../../package.json'
export default {
  name: `page-information`,
  data() {
    return {
      version: pkg.version,
    }
  },
}
</script>

