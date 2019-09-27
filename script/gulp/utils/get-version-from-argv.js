'use strict'

const semver = require('semver')

module.exports = (defaultVersion = null) => {
  const arg = process.argv[process.argv.length - 1] || ''
  const version = arg.substring(2)

  return semver.valid(version) !== null
    ? version
    : defaultVersion
}
