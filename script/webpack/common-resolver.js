'use strict'

/*
class MyResolverPlugin {
  constructor (source, target) {
    this.source = source
		this.target = target
	}

  apply (resolver) {
    const target = resolver.ensureHook(this.target)

    console.log(this)

		resolver
      .getHook(this.source)
      .tapAsync('MyResolverPlugin', (request, resolveContext, callback) => {
        // Any logic you need to create a new `request` can go here
        resolver.doResolve(target, request, null, resolveContext, callback)
			})
	}
}

module.exports = MyResolverPlugin
*/

module.exports = function () {
  const optionsToUse = {}

  return {
    apply: doApply.bind(this, optionsToUse)
  }
}

function doApply (options, resolver) {
  // file type taken from: https://github.com/webpack/enhanced-resolve/blob/v4.0.0/test/plugins.js
  const target = resolver.ensureHook('undescribed-raw-file')

  resolver.getHook('before-existing-directory')
    .tapAsync('DirectoryNamedWebpackPlugin', (request, resolveContext, callback) => {
      // Any logic you need to create a new `request` can go here

      console.log(target)
      // console.log(request.request)

      resolver.doResolve(target, request, null, resolveContext, callback)
    })
}
