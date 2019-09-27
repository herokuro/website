'use strict'

const production = process.argv.includes('-p') || process.argv.includes('--mode=production')

module.exports = {
  get dev () { return !production },
  get prod () { return production },

  get development () { return !production },
  get production () { return production },

  inDevelopment: (...entries) =>
    !production
      ? entries.reduce((acc, obj) => ({ ...acc, ...obj }), {})
      : {},

  inProduction: (...entries) =>
    production
      ? entries.reduce((acc, obj) => ({ ...acc, ...obj }), {})
      : {},

  whenDevelopment: (...entries) => !production ? entries : [],
  whenProduction: (...entries) => production ? entries : []
}
