'use strict'

const pkgDir = require('pkg-dir')
const parseAuthor = require('parse-author')

const rootDir = pkgDir.sync()
const rawPkg = require(`${rootDir}/package.json`)

class NameString extends String {
  constructor (name) {
    super(name)

    const [, pkgScope, pkgBareName] = /^(?:(@[\w-_]+)\/)?([\w-_]+)$/.exec(name)

    this.scope = pkgScope || null
    this.name = pkgBareName
  }

  get hasScope () {
    return !!this.scope
  }
}

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
  name: new NameString(rawPkg.name),
  description: rawPkg.description,
  version: rawPkg.version,
  author: new AuthorString(rawPkg.author)
}
