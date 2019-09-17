'use strict'

const path = require('path')
const gulp = require('gulp')
// const debug = require('gulp-debug')
const replace = require('./utils/gulp-replace-with')
const detemplate = require('./utils/gulp-detemplate')
const year = require('./utils/license-year-range')
const commiter = require('./utils/semantic-release-github-pages-commiter')
const pkg = require('./utils/packager')

const root = path.join(__dirname, '../../')
const src = path.join(root, '/src')
const build = path.join(root, '/build')
const url = 'github.com/herokuro/herokuro.github.io.git'

const docData = {
  license: { year: year(2019) },
  author: pkg.author
}

gulp.task('build:docs:repo', async () => {
  gulp
    .src([
      `${src}/doc/LICENSE.md.tpl`,
      `${src}/doc/repo/README.md.tpl`
    ])
    .pipe(replace(docData))
    .pipe(detemplate())
    .pipe(gulp.dest(root))
})

gulp.task('build:docs:deploy', async () => {
  gulp
    .src([
      `${src}/doc/LICENSE.md.tpl`,
      `${src}/doc/deploy/README.md.tpl`
    ])
    .pipe(replace(docData))
    .pipe(detemplate())
    .pipe(gulp.dest(build))
})

gulp.task('build:docs', gulp.parallel('build:docs:repo', 'build:docs:deploy'))

gulp.task('deploy', async () => {
  await commiter.run(root, '/build', '/deploy', url)
})
