'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const args = require(`yargs`).argv

const isProd = args.compress === true
const isDev = !isProd
// const env         = isProd ? `production` : `development`
const isRelease = args.release === true
const destFolder = isRelease ? `public` : `dist`

////////
// ICONS
////////

const materialName = /outline-([^\d]*)-24px/
exports.icons = () => {
  return gulp
    .src(`./source/icons/*.svg`)
    .pipe(
      $.cheerio({
        run: $ => $(`#Bounding_Boxes`).remove(),
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(
      $.svgo({
        plugins: [{ removeViewBox: false }],
      })
    )
    .pipe(
      $.rename(path => {
        const { basename } = path
        const isMaterialIcon = materialName.test(basename)
        if (!isMaterialIcon) return
        path.basename = materialName.exec(basename)[1].replace(/_/g, `-`)
      })
    )
    .pipe(
      $.svgSymbols({
        svgAttrs: {
          class: `svg-icon-wrapper`,
          xmlns: false,
        },
        templates: [
          `default-demo`,
          path.join(__dirname, `./source/icons/svg-icons.vue`),
        ],
      })
    )
    .pipe($.if(/[.]vue$/, gulp.dest(`application/ui`)))
    .pipe($.if(/[.]html$/, gulp.dest(`source/icons`)))
}

////////
// APP LOGO
////////

const logoBasename = `touch-icon`

const appLogo = () => {
  return gulp
    .src(`source/thaime-logo.png`)
    .pipe($.imageResize({ width: 192, height: 192, upscale: true }))
    .pipe(
      $.rename(path => (path.basename = `launcher-icon-${logoBasename}-4x`))
    )
    .pipe(gulp.dest(destFolder))
    .pipe($.imageResize({ width: 180, height: 180, upscale: true }))
    .pipe($.rename(path => (path.basename = `${logoBasename}-iphone-6-plus`)))
    .pipe(gulp.dest(destFolder))
    .pipe($.imageResize({ width: 152, height: 152, upscale: true }))
    .pipe($.rename(path => (path.basename = `${logoBasename}-ipad-retina`)))
    .pipe(gulp.dest(destFolder))
    .pipe($.imageResize({ width: 144, height: 144, upscale: true }))
    .pipe($.rename(path => (path.basename = `${logoBasename}-web-app`)))
    .pipe(gulp.dest(destFolder))
    .pipe($.imageResize({ width: 120, height: 120, upscale: true }))
    .pipe($.rename(path => (path.basename = `${logoBasename}-iphone-retina`)))
    .pipe(gulp.dest(destFolder))
    .pipe($.imageResize({ width: 76, height: 76, upscale: true }))
    .pipe($.rename(path => (path.basename = `${logoBasename}-icon-ipad`)))
    .pipe(gulp.dest(destFolder))
    .pipe($.imageResize({ width: 57, height: 57, upscale: true }))
    .pipe($.rename(path => (path.basename = `${logoBasename}-icon-iphone`)))
    .pipe(gulp.dest(destFolder))
}
appLogo.description = `resize favicon for different devices`
exports[`app-logo`] = appLogo

////////
// SERVICE WORKER
////////

const workbox = require('workbox-build')

// all options are listed here
// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.Configuration
const serviceWorker = () => {
  return workbox
    .generateSW({
      globDirectory: destFolder,
      globPatterns: [`**\/*.{html,js,css,png,svg,json}`],
      swDest: `${destFolder}/thaime-sw.js`,
      cacheId: `thaime-cache-v1`,
      navigateFallback: `/index.html`,
      // this is for allowing thaime-lib.js in dev
      maximumFileSizeToCacheInBytes: isDev ? 5000000 : 2097152,
    })
    .catch(error => console.warn(`Service worker generation failed: ${error}`))
}
serviceWorker.description = `generate the service worker using workbox`
exports[`service-worker`] = serviceWorker
