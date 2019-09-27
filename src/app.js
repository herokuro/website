// import styles
import './styles/index.sass'

// import scripts
import './scripts/index.js'

// import icon sprites
require.context('./icons/sprites/', true, /\.svg$/)

// import fonts
require.context('./fonts/', true, /\.woff$/)
