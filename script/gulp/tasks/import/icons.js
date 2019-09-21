'use strict'

const path = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename')
const remoteSrc = require('gulp-remote-src')
const p = require('../../utils/paths')

gulp.task('import:icons:brand', async () => {
  const dir = path.dirname(require.resolve('@herokuro/brand/package.json'))
  const cwd = `${dir}/dist/logo`

  const media = [
    'stroke.svg',
    'stroke-black.svg'
  ]

  gulp
    .src(media, { cwd })
    .pipe(rename(path => {
      let newName = path.basename

      switch (path.basename) {
        case 'stroke':
          newName = 'brand-logo-colored'
          break

        case 'stroke-black':
          newName = 'brand-logo'
          break
      }

      path.basename = newName
    }))
    .pipe(gulp.dest(`${p.src}/icons/sprites/imported`))
})

gulp.task('import:icons:tools', async () => {
  const tools = [
    'config-vars',
    'maintenance',
    'noop-server'
  ]

  Promise.all(tools.map(async tool => {
    const pkg = require(`@herokuro/${tool}/package.json`)
    const url = new URL(pkg.homepage)
    const base = `https://raw.githubusercontent.com${url.pathname}/master/media/`

    remoteSrc(['logo.svg', 'logo-black.svg'], { base })
      .pipe(rename(path => {
        let newName = path.basename

        switch (path.basename) {
          case 'logo':
            newName = `tool-${tool}-logo-colored`
            break

          case 'logo-black':
            newName = `tool-${tool}-logo`
            break
        }

        path.basename = newName
      }))
      .pipe(gulp.dest(`${p.src}/icons/sprites/imported`))

    remoteSrc('logo-animatable.svg', { base })
      .pipe(rename(`tool-${tool}-logo-animatable.svg`))
      .pipe(gulp.dest(`${p.src}/icons/inlined/imported`))
  }))
})

gulp.task('import:icons',
  gulp.parallel(
    'import:icons:brand',
    'import:icons:tools'
  )
)
