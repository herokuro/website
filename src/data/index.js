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
      { property: 'image', content: 'image link' },
      { property: 'url', content: url },
      { property: 'site_name', content: title }
    ],
    twitter: [
      { name: 'card', content: 'card content' },
      { name: 'image:alt', content: 'image alt content' },
      { name: 'site', content: 'site content' }
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
