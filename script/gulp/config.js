'use strict'

const gulp = require('gulp')
const debug = require('gulp-debug')
const commiter = require('./utils/semantic-release-github-pages-commiter')
const p = require('./utils/paths')

require('./tasks/import/icons')
require('./tasks/import/metadata')
require('./tasks/build/docs')

const url = 'github.com/herokuro/herokuro.github.io.git'

gulp.task('deploy', async () => {
  await commiter.run(p.root, '/build', '/deploy', url)
})
