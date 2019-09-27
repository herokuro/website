/*
const viewportHeight = $(window).height()
const scrollStart = 0
const scrollEnd = viewportHeight * .5

console.log(viewportHeight)

const columns = $('.column-item')

// const startFrom = Math.round(viewportHeight * .1)
const startFrom = 0
const endFrom = Math.round(viewportHeight * .45)

$(document).on('scroll', () => {
  let y = $(document).scrollTop()
  const dy = scrollEnd - y

  console.log(y, startFrom)

  if (y > startFrom && y <= endFrom) {
    columns.eq(0).css('top', y)
    columns.eq(4).css('top', y)
  }

  if (y > 0 && y <= 250) {
    columns.eq(1).css('top', y)
    columns.eq(3).css('top', y)
  }

  if (y > 0 && y <= 25) {
    columns.eq(2).css('top', y)
  }

  // columns.eq(0).css('top', y)
  // columns.eq(4).css('top', y)
})
*/

export default {
  init: () => {
    console.log('Lead initialized')
  }
}
