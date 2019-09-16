'use strict'

const path = require('path')
const ci = require('is-ci')
const execa = require('execa')
const check = require('./check-throw')
const awhile = require('./awhile')
const getVersion = require('./get-version-from-argv')
const isVersionValid = require('./is-version-valid')

module.exports = {
  run: async (rootDirectory, buildDirectory, repositoryDirectory, repositoryUrl) => {
    // check CI environment
    check(!ci, 'Script can be executed only in a CI environment.')

    const token = process.env.GH_TOKEN

    // check token presence
    check(!token, 'GitHub token is not present.')

    // check for proper rootDirectory
    check(!path.isAbsolute(rootDirectory), `rootDirectory must be absolute, got "${rootDirectory}".`)

    // prepare paths
    const root = path.normalize(rootDirectory)
    const build = path.join(rootDirectory, buildDirectory)
    const repo = path.join(rootDirectory, repositoryDirectory)

    console.log(`root directory: "${root}"`)
    console.log(`build directory: "${buildDirectory}"`)
    console.log(`repository directory: "${repositoryDirectory}"`)

    // delete repository diectory
    console.log(`Delete repository directory "${repositoryDirectory}" if exists.`)
    await execa('rm', ['-rf', repo])

    // wait for a while for the previous process to be completed
    await awhile('2.5s')

    // clone repository into its own directory
    console.log(`Clone "${repositoryUrl}" repository into "${repositoryDirectory}".`)
    await execa('git', ['clone', `https://${token}@${repositoryUrl}`, repo])

    // clear deploy repository (delete all files)
    console.log('Clear repository.')
    try {
      await execa('git', ['rm', '-r', '*'], { cwd: repo })
    } catch (e) {
      // noop
    }

    // wait for a while for the previous process to be completed
    await awhile('2.5s')

    // copy build files to deploy repository
    console.log(`Copy build files from "${buildDirectory}" into "${repositoryDirectory}".`)
    await execa('cp', ['-R', `${build}/.`, repo])

    // wait for a while for the previous process to be completed
    await awhile('2.5s')

    const version = getVersion()

    // check version validity
    check(!isVersionValid(version), `Version "${version}" is invalid.`)

    // commit files with next version
    console.log(`Commit content with version "${version}".`)
    await execa('git', ['add', '.'], { cwd: repo })
    await execa('git', ['commit', '--allow-empty', '-m', `chore(release): ${version} [skip ci]`], { cwd: repo })

    // push content to remote repository
    console.log(`Push content to remote "${repositoryUrl}".`)
    await execa('git', ['push', '-u', 'origin', 'master'], { cwd: repo })
  }
}
