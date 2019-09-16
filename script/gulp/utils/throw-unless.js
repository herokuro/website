'use strict'

module.exports = (thisIsTrue, otherwiseThis) => {
  if (!thisIsTrue) {
    if (typeof otherwiseThis === 'string') {
      throw new Error(otherwiseThis)
    } else if (typeof otherwiseThis === 'function') {
      return otherwiseThis()
    } else {
      throw otherwiseThis
    }
  }
}
