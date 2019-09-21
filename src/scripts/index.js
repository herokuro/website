import loadSvgSprite from './utils/load-svg-sprite'
import Lead from './sections/Lead'

$(async () => {
  await loadSvgSprite('assets/icons.svg')

  Lead.init()
})
