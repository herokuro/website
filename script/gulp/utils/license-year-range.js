'use strict'

const currentUtcYear = new Date().getFullYear()

module.exports = (startYear = null, endYear = null) => {
  let start = currentUtcYear
  let end = currentUtcYear

  if (startYear) {
    start = startYear
  }

  if (endYear) {
    end = endYear
  }

  if (start !== end) {
    return `${start}-${end}`
  }

  return start
}
