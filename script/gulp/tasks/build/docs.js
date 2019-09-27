'use strict'

const gulp = require('gulp')
const replace = require('../../utils/gulp-replace-with')
const detemplate = require('../../utils/gulp-detemplate')
const year = require('../../utils/license-year-range')
const pkg = require('../../utils/packager')

const p = require('../../utils/paths')

const docData = {
  license: { year: year(2019) },
  author: pkg.author
}

gulp.task('build:docs:repo', async () => {
  gulp
    .src([
      `${p.src}/doc/LICENSE.md.tpl`,
      `${p.src}/doc/repo/README.md.tpl`
    ])
    .pipe(replace(docData))
    .pipe(detemplate())
    .pipe(gulp.dest(p.root))
})

gulp.task('build:docs:deploy', async () => {
  gulp
    .src([
      `${p.src}/doc/LICENSE.md.tpl`,
      `${p.src}/doc/deploy/README.md.tpl`
    ])
    .pipe(replace(docData))
    .pipe(detemplate())
    .pipe(gulp.dest(p.build))
})

gulp.task('build:docs', gulp.parallel('build:docs:repo', 'build:docs:deploy'))
