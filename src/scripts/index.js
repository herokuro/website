import loadSvgSprite from './utils/load-svg-sprite'

$(async () => {
  await loadSvgSprite('assets/icons.svg')
  console.log('webapp initialized')
})
