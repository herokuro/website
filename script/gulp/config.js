'use strict'

const path = require('path')
const gulp = require('gulp')
const commiter = require('./utils/semantic-release-github-pages-commiter')

const root = path.join(__dirname, '../../')
const url = 'github.com/herokuro/herokuro.github.io.git'

gulp.task('deploy', async () => {
  await commiter.run(root, '/build', '/deploy', url)
})
