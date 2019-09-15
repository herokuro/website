import loadSvgSprite from './utils/load-svg-sprite'

$(async () => {
  await loadSvgSprite('/icons.svg')
  console.log('webapp initialized')
})
