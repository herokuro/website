'use strict'

/* eslint-disable object-curly-newline */

const path = require('path')

// const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')
const HTML = require('html-webpack-plugin')
const Extract = require('mini-css-extract-plugin')
const SVG = require('svg-sprite-loader/plugin')
const Favicon = require('favicons-webpack-plugin')

const data = require('../../src/data')
const pkg = require('../gulp/utils/packager')
const getVersion = require('../gulp/utils/get-version-from-env')

const ASSETS = 'assets'
const ROOT = path.join(__dirname, '../../')
// const CSS_COMMON = path.join(ROOT, '/src/styles/common/index.sass')
const development = !process.argv.includes('-p')
const version = development ? pkg.version : getVersion()

module.exports = {
  entry: './src/app.js',

  output: {
    filename: `${ASSETS}/scripts.js`,
    path: path.join(ROOT, development ? '/dev' : '/build'),
    publicPath: '/'
  },

  devtool: development ? 'inline-source-map' : false,

  performance: {
    hints: development ? 'warning' : 'error'
  },

  resolve: {
    alias: {
      // common: path.join(ROOT, './src/styles/common/index.sass')
    }
  },

  module: {
    rules: [
      // Markup processing
      { test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [path.join(ROOT, '/src/markup/helpers')],
          partialDirs: [path.join(ROOT, '/src/markup/partials')]
        }
      },
      // SVG sprites processing
      { test: /icons\/.*\.svg$/,
        use: [
          { loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: `${ASSETS}/icons.svg`,
              runtimeCompat: true
            }
          }
        ]
      },
      // Font processing
      { test: /\.woff$/,
        use: [
          { loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${ASSETS}/fonts`
            }
          }
        ]
      },
      // Style processing
      { test: /\.sass$/,
        use: [
          { loader: Extract.loader },
          { loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          { loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: [require('autoprefixer')]
            }
          },
          { loader: 'sass-loader',
            options: {
              sourceMap: true
              /*
              sassOptions: {
                importer: (url, prev, done) => {
                  done(url === 'common' ? { file: CSS_COMMON } : {})
                }
              }
              */
            }
          }
        ]
      },
      // JavaScript processing
      { test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new Copy([
      // copy jquery
      { from: path.join(ROOT, '/node_modules/jquery/dist/jquery.min.js'),
        to: path.join(ROOT, '/dev/vendors') }
    ]),
    new HTML({
      filename: 'index.html',
      template: path.join(ROOT, '/src/markup/index.hbs')
    }),
    new Favicon({
      logo: path.join(ROOT, '/src/metadata/imported/favicon.png'),
      prefix: development ? 'assets/' : '',
      favicons: {
        appName: data.title,
        appShortName: pkg.name.scope,
        appDescription: pkg.description,
        developerName: pkg.author.name,
        developerURL: pkg.author.url,
        version: version,
        start_url: '/',
        display: 'browser',
        background: '#ddd',
        theme_color: '#333',
        icons: {
          android: true,
          appleIcon: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true
        }
      }
    }),
    new Extract({
      filename: `${ASSETS}/styles.css`
    }),
    new SVG({
      plainSprite: true
    })
  ],

  devServer: {
    contentBase: path.join(ROOT, '/dev'),
    watchContentBase: true,
    writeToDisk: true,
    compress: true
  }
}
