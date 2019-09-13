'use strict'

const path = require('path')

const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')
const HTML = require('html-webpack-plugin')
const Extract = require('mini-css-extract-plugin')

const ROOT = path.join(__dirname, '../../')

module.exports = {
  entry: './src/app.js',

  output: {
    filename: 'bundle.js',
    path: path.join(ROOT, '/dev'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      // Markup processing
      { test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [ path.join(ROOT, '/src/markup/helpers') ],
          partialDirs: [ path.join(ROOT, '/src/markup/partials') ]
        }
      },
      // Style processing
      { test: /\.(sass|scss|css)$/,
        use: [
          { loader: Extract.loader
          },
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
              plugins: [ require('autoprefixer') ]
            }
          },
          { loader: 'sass-loader',
            options: {
              sourceMap: true
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
        to: path.join(ROOT, '/dev/vendor') }
    ]),
    new HTML({
      template: path.join(ROOT, '/src/markup/index.hbs')
    }),
    new Extract({
      filename: 'bundle.css'
    })
  ],

  devServer: {
    contentBase: path.join(ROOT, '/dev'),
    writeToDisk: true,
    compress: true
  }
}
