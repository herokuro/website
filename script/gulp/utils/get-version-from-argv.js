'use strict'

module.exports = () => {
  const arg = process.argv[process.argv.length - 1] || ''
  const version = arg.substring(2)

  return version
}
