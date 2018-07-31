import postcss from 'postcss'
import process from './process'
import { full, minimal } from './reset'

const isPositionDecl = node => {
  return node.type === 'decl' &&
    ['horizontal', 'vertical', 'type'].some(prop => prop === node.prop)
}

const hasPositionDecl = rule => {
  return rule.nodes.some(isPositionDecl)
}

const defaults = {
  reset: 'minimal',
  warn: 'same',
  dev: false
}

module.exports = postcss.plugin('postcss-positioning', opts => {
  opts = {
    ...defaults,
    ...opts
  }

  return root => {
    root.walkRules(rule => {
      if (hasPositionDecl(rule)) {
        process(rule)
      }
    })

    switch (opts.reset) {
      case 'full':
        root.prepend(full)
        break
      case 'minimal':
        root.prepend(minimal)
        break
    }
  }
})
