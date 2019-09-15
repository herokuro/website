'use strict'

export default function loadSvgSprite (url, optionsOrCallback, callback) { // eslint-disable-line no-unused-vars
  let type = typeof url

  if (!url || type !== 'string') {
    type = type !== 'string' ? type : `empty ${type}`

    throw new Error(`The url must be a non-empty string, got: "${type}".`)
  }

  // check if the url has the .svg extension, otherwise append to it automatically
  if (url.lastIndexOf('.svg') !== url.length - 4) {
    url += '.svg'
  }

  let options = optionsOrCallback || {}

  type = typeof optionsOrCallback

  if (optionsOrCallback && type === 'object') {
    options = optionsOrCallback
  } else if (type === 'function') {
    options = {}
    callback = optionsOrCallback
  }

  let promise
  let res
  let rej

  if (Promise) {
    promise = new Promise((resolve, reject) => {
      res = resolve
      rej = reject
    })
  }

  const xhr = new XMLHttpRequest()

  xhr.onloadend =
    xhr.onerror = () => {
      if (xhr.status === 200) {
        const element = document.createElement('div')
        element.innerHTML = xhr.response

        const elementClass = typeof options.class === 'string' ? options.class : ''

        if (elementClass.length > 0) {
          element.className = elementClass
        }

        const hideElement = typeof options.hide === 'boolean' ? options.hide : true

        if (hideElement) {
          element.style.display = 'none'
        }

        document.body.appendChild(element)

        if (callback) {
          callback()
        } else if (promise) {
          res()
        }
      } else {
        const error = new Error(`Cannot load SVG file: "${url}".`)

        if (callback) {
          callback(error)
        } else if (promise) {
          rej(error)
        }
      }
    }

  xhr.open('get', url, true)
  xhr.send(null)

  return promise || null
}
