import postcss from 'postcss'
import process from './process'
import reset from './reset'

const isPositionDecl = node => {
  return node.type === 'decl' &&
        ['horizontal', 'vertical', 'type'].some(prop => prop === node.prop)
}

const hasPositionDecl = rule => {
  return rule.nodes.some(isPositionDecl)
}

const defaults = {
  reset: true,
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

    if (opts.reset) {
      root.prepend(reset)
    }
  }
})
