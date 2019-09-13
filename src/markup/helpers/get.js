'use strict'

const data = require('../../data')
const get = require('get-value')

module.exports = key => get(data, key, { default: null })
