'use strict'

const duratio = require('./duratio')

module.exports = duration =>
  new Promise(resolve => {
    setTimeout(() => resolve(), duratio(duration))
  })
