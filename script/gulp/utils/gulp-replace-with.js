'use strict'

const tap = require('gulp-tap')
const get = require('get-value')

/**
 * Replace the given string containing placeholder with the key-value pairs of the object.
 *
 * @param {string} string - The string to use to replace the placeholders within.
 * @param {Object} object - The key-value pairs to use to replace the placeholders with.
 *
 * @returns {string}
 */
function replaceWith (string, object) {
  string = string || ''
  object = object || {}

  return string.replace(/{{\s*?([\w].*?)\s*?}}/gi, (match, key) => {
    // console.log(match, `"${key}"`, get(object, key, match))
    return get(object, key, match)
  })
}

/**
 * @param {Object} file
 * @param {Array}  args
 */
function replacer (file, args) {
  let content = file.contents.toString()

  args.forEach(entry => {
    if (typeof entry === 'function') {
      content = replaceWithFunction(content, entry)
    } else {
      content = replaceWithKeyValue(content, entry)
    }
  })

  file.contents = Buffer.from(content)
}

/**
 * Replaces any key-value matches in the content of the file.
 *
 * @param {string} content     - The content of the file in the Gulp stream to modify.
 * @param {Object} keyValueMap - The key-value map to us to replace the file content.
 *
 * @returns {string} The modified content of the file
 */
function replaceWithKeyValue (content, keyValueMap) {
  return replaceWith(content, keyValueMap)
}

/**
 * Replaces the content of the file by using a custom callback.
 *
 * @param {string}   content  - The content of the file in the Gulp stream to modify.
 * @param {Function} callback - The callback, which result is used to replace the file content.
 *
 * @returns {string} The modified content of the file.
 */
function replaceWithFunction (content, callback) {
  return callback(content)
}

module.exports = (...keyValueMapOrCallback) => tap(file => replacer(file, keyValueMapOrCallback))
