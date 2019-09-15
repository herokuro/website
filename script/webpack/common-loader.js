'use strict'

module.exports = function (source) {
  console.log('---------------------------------------------------------------')
  console.log(source)
  console.log('---------------------------------------------------------------')

  return source
}

/*
module.exports = function (source, map) {
  console.log('---------------------------------------------------------------')
  console.log(source)
  console.log('---------------------------------------------------------------')

  this.callback(null, source, map)
}
*/
