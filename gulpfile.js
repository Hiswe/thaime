'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const args = require('yargs').argv
const del = require('del')
const Parcel = require('parcel-bundler')
const chalk = require('chalk')
const resizer = require('node-image-resizer')

const isRelease = args.release !== false
const destFolder = isRelease ? `public` : `dist`

console.log('build for', chalk.magenta(isRelease ? `release` : `development`))

////////
// ICONS
////////

const materialName = /(?:outline|baseline)-([^\d]*)-24px/
const icons = () => {
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
          class: `svg-symbol`,
          xmlns: false,
        },
        class: `.svg-symbol--%f`,
        templates: [`default-demo`, `default-vue`],
      })
    )
    .pipe($.if(/[.]vue$/, gulp.dest(`application/ui`)))
    .pipe($.if(/[.]html$/, gulp.dest(`source/icons`)))
}
icons.description = `build SVG icons`
exports[`build:icons`] = icons

////////
// APP LOGO
////////

const cleanAppLogo = () => {
  return del([`public/touch-*`, `public/launcher-*`])
}

const LOGO_PATH = path.join(__dirname, `source/application-logo/touch-icon.png`)
const RESIZER_SETUP = {
  all: {
    path: path.join(__dirname, `/public/`),
  },
  versions: [
    {
      prefix: `launcher-`,
      suffix: `-4x`,
      width: 192,
      height: 192,
    },
    { suffix: `-iphone-6-plus`, width: 180, height: 180 },
    { suffix: `-ipad-retina`, width: 152, height: 152 },
    { suffix: `-web-app`, width: 144, height: 144 },
    { suffix: `-iphone-retina`, width: 120, height: 120 },
    { suffix: `-ipad`, width: 76, height: 76 },
    { suffix: `-iphone`, width: 57, height: 57 },
  ],
}
const appLogo = async () => {
  await resizer(LOGO_PATH, RESIZER_SETUP)
}
appLogo.description = `resize favicon for different devices`
exports[`application-logo`] = gulp.series(cleanAppLogo, appLogo)

////////
// SERVICE WORKER
////////

const workbox = require('workbox-build')

// all options are listed here
// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.Configuration
const generateServiceWorker = () => {
  return workbox
    .generateSW({
      globDirectory: `public`,
      globPatterns: [`**\/*.{html,js,css,png,svg,json}`],
      swDest: `public/thaime-service-worker.js`,
      cacheId: `thaime-cache-v1`,
      navigateFallback: `/index.html`,
    })
    .catch(error => console.warn(`Service worker generation failed: ${error}`))
}
const addServiceWorkerSkipWaitingCode = () => {
  return gulp
    .src([
      `public/thaime-service-worker.js`,
      `source/service-worker-skipwaiting.js`,
    ])
    .pipe($.concat(`thaime-service-worker.js`))
    .pipe(gulp.dest(`public`))
}
const serviceWorker = gulp.series(
  generateServiceWorker,
  addServiceWorkerSkipWaitingCode
)
serviceWorker.description = `generate the service worker using workbox`
exports[`service-worker`] = serviceWorker

////////
// WEB MANIFEST
////////

const webManifest = () => {
  return gulp.src(`manifest.webmanifest`).pipe(gulp.dest(`public`))
}
webManifest.description = `copy the web manifest to the right place`
exports[`web-manifest`] = webManifest

////////
// BUMP
////////

const bump = done => {
  if (!args.to) {
    console.log(chalk.red(`bump task needs the --to argument`))
    return done()
  }
  return gulp
    .src([`package.json`, `manifest.webmanifest`])
    .pipe($.jsonEditor({ version: args.to }))
    .pipe(gulp.dest(`.`))
}
bump.description = `bump to the --to=`
exports[`bump`] = bump

////////
// BUILD FOR PRODUCTION
////////

//----- APPLICATION

const cleanPublic = () => {
  return del([`public/*`, `!public/index.html`])
}
exports['clean-public'] = cleanPublic

const applicationEntryFile = path.join(__dirname, `./application/index.js`)
const parcelBundler = new Parcel(applicationEntryFile, {
  outDir: `./public`,
  outFile: `thaime`,
  watch: false,
  sourceMaps: false,
  detailedReport: false,
  cache: false,
  logLevel: 2,
  // minify break the build
  minify: false,
})

const application = done => {
  parcelBundler.bundle()
  parcelBundler.on(`buildEnd`, () => {
    done()
  })
}
application.description = `bundle vue application with parcel.js`
exports[`build:application`] = application

exports[`build:app`] = gulp.series(cleanPublic, application)

//----- MINIFY

const minifyJs = () => {
  return gulp
    .src(`public/*.js`)
    .pipe($.babelMinify())
    .pipe(gulp.dest(`public`))
}
minifyJs.description = `minify js`
exports[`minify:js`] = minifyJs

const minifyCss = () => {
  return gulp
    .src(`public/*.css`)
    .pipe($.cleanCss())
    .pipe(gulp.dest(`public`))
}
minifyCss.description = `minify css`
exports[`minify:css`] = minifyCss

const minify = gulp.parallel(minifyJs, minifyCss)

//----- BUILD ALL

exports.build = gulp.series(
  cleanPublic,
  icons,
  gulp.parallel(appLogo, webManifest, application),
  minify,
  serviceWorker
)
