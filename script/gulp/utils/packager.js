'use strict'

const pkgDir = require('pkg-dir')
const parseAuthor = require('parse-author')

const rootDir = pkgDir.sync()
const rawPkg = require(`${rootDir}/package.json`)

class AuthorString extends String {
  constructor (author) {
    super(author)

    const parts = parseAuthor(author)

    this.name = parts.name
    this.email = parts.email
    this.url = parts.url
  }
}

module.exports = {
  author: new AuthorString(rawPkg.author)
}
