'use strict'

const rename = require('gulp-rename')

module.exports = () => {
  return rename(path => {
    switch (path.extname) {
      case '.tpl':
        path.extname = ''
        break
    }
  })
}
