'use strict'

const pkg = require('../../package.json')

const title = '@herokuro - Node.js tools to manage your Heroku projects.'
const url = 'https://herokuro.github.io'

module.exports = {
  title: title,
  description: pkg.description,
  meta: {
    general: [
      { property: 'title', content: title },
      { property: 'description', content: pkg.description },
      { property: 'image', content: `${url}/thumbnail-facebook.jpg` },
      { property: 'url', content: url }
    ],
    twitter: [
      { name: 'title', content: title },
      { name: 'description', content: pkg.description },
      { name: 'image', content: `${url}/thumbnail-twitter.jpg` },
      { name: 'card', content: 'summary_large_image' },
      { name: 'url', content: url }
    ]
  },
  lead: {
    links: [
      { href: '#', icon: 'github', name: 'GitHub' },
      { href: '#', icon: 'twitter', name: 'Twitter' }
    ],
    icons: [
      { name: 'item-1' },
      { name: 'item-2' },
      { name: 'item-3' },
      { name: 'item-4' },
      { name: 'item-5' },
      { name: 'item-6' },
      { name: 'item-7' }
    ]
  },
  footer: {
    main: [
      {
        title: 'Tools',
        list: [
          { icon: 'x', name: 'noop-server', link: 'xxx' }
        ]
      }
    ]
  }
}
