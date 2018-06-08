'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

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
