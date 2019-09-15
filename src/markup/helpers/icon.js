'use strict'

const icons = require('../../data/icons')
const get = require('get-value')

module.exports = key => get(icons, key, { default: icons.default })
