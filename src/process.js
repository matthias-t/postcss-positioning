// Processes positioning for a rule

import Position from './position/'
import isAuto from './position/isAuto'
import { stretchCount, stretchRatio, wrapCalc } from './position/stretch'
import transform, { resetDeclaration } from './transform'

export default rule => {
  const position = Position.parse(rule).stretch()

  let prefix = ''

  if (position.align) {
    // display: block or inline-block depending on the axis
    rule.append({
      prop: 'display',
      value: position.align.display
    })

    prefix = 'margin-'

    // first and last margins
    if (position.margins) {
      rule.after({
        selector: rule.selector + ':first-child'
      }).next().append({
        prop: 'margin-' + position.align.before,
        value: position.margins.first
      }).after({
        selector: rule.selector + ':last-child'
      }).next().append({
        prop: 'margin-' + position.align.after,
        value: position.margins.last
      })
    }
  } else {
    // Declarations with auto and 2 stretch lengths
    resetDeclaration()
    position.iterateDirections((direction, lengths) => {
      if (lengths.some(isAuto) && stretchCount(lengths) === 2) {
        position.type = 'relative'

        const ratio = stretchRatio(lengths)
        rule.append({
          prop: direction.before,
          value: wrapCalc(ratio)
        })
        transform(rule, direction, ratio)

        position.setDirection(direction,
          [undefined, lengths[1], undefined])
      }
    })

    position.strip()

    // position: absolute / relative / static / fixed
    rule.append({
      prop: 'position',
      value: position.type || 'absolute'
    })
  }

  position.iterateLengths((direction, length, value) => {
    rule.append({
      prop: (length === 'size' ? '' : prefix) + direction[length],
      value
    })
  })
}
