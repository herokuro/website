'use strict'

const path = require('path')
const gulp = require('gulp')
const p = require('../../utils/paths')

gulp.task('import:metadata', async () => {
  const dir = path.dirname(require.resolve('@herokuro/brand/package.json'))
  const cwd = `${dir}/dist/social`

  gulp
    .src(['favicon.png', 'thumbnail-*.jpg'], { cwd })
    .pipe(gulp.dest(`${p.src}/metadata/imported`))
})
