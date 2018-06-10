<template>
  <section class="page-content">
    <t-page-title>
      about thaime
    </t-page-title>
    <t-info-category title="Author & suggestions">
      <p>brought to you by <strong>Yannick “Hiswe” Aïvayan</strong></p>
      <p>find me on:</p>
      <ul>
        <li><a href="https://hiswe.github.com">my blog</a></li>
        <li><a href="https://github.com/hiswe">github</a></li>
        <li><a href="https://twitter.com/hiswehalya">twitter</a></li>
      </ul>
      <p>Any suggestions can be send:</p>
      <ul>
        <li>using the form on <a href="http://www.hiswe.net/contact" target="_blank">hiswe.net</a></li>
        <li>creating a ticket on <a href="https://github.com/Hiswe/thaime/issues" target="_blank">the github repo</a></li>
      </ul>
    </t-info-category>
    <!-- <t-info-category title="share the app">
      <p>The app can be shared with this link </p>
      <a href={ state.appLink }>{ state.appLink }</a>
      <p>
        <CopyToClipboard text={ state.appLink }>
          <button className="btn">Copy to clipboard</button>
        </CopyToClipboard>
      </p>
      <p>or this QR code</p>
      <Icon svgId="thailpha-firebase" />
    </t-info-category> -->
    <t-info-category title="Source & ressources">
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
    </t-info-category>
  </section>
</template>

<style lang="scss" scoped>
.page-content {
  padding-bottom: var(--navigation-total-height);
}
</style>


<script>
import infoCategory from './info-category'
export default {
  name: `page-information`,
  components: {
    't-info-category': infoCategory,
  },
}
</script>

