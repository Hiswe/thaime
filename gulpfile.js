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
    .pipe($.if(/[.]vue$/, gulp.dest(`src/components`)))
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
    path: path.join(__dirname, `/application/assets/`),
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
// BUMP
////////

const bump = done => {
  if (!args.to) {
    console.log(chalk.red(`bump task needs the --to argument`))
    return done()
  }
  // TODO: bump production webmanifest
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

const cleanDist = () => del([`dist/**/*`])
exports[`clean-dist`] = cleanDist

const pwaEntryFile = path.join(__dirname, `./src/index.pug`)
const pwaBundler = new Parcel(pwaEntryFile, {
  outDir: process.env.RELEASE ? `./dist` : `./public`,
  // outFile: `thaime`,
  watch: false,
  sourceMaps: !process.env.RELEASE,
  detailedReport: false,
  cache: false,
  logLevel: 2,
})

const pwaApplication = done => {
  pwaBundler.bundle()
  pwaBundler.on(`buildEnd`, () => {
    done()
  })
}
pwaApplication.description = `bundle vue pwa application with parcel.js`
exports[`build:pwa`] = gulp.series(cleanDist, pwaApplication)

//----- BUILD ALL

exports.build = gulp.series(
  cleanDist,
  gulp.parallel(icons, appLogo),
  pwaApplication
)
