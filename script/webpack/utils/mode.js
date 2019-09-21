'use strict'

const production = process.argv.includes('-p') || process.argv.includes('--mode=production')

module.exports = {
  get dev () { return !production },
  get prod () { return production },

  get development () { return !production },
  get production () { return production },

  get inDevelopment () { return !production },
  get inProduction () { return production },

  whenDevelopment: (...entries) => { return !production ? entries : [] },
  whenProduction: (...entries) => { return production ? entries : [] }
}
