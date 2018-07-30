import { isStretch } from './stretch'

export default function (rule) {
  if (this.align && this.type) {
    throw rule.error(
      'Cannot align and be ' + this.type
    )
  }

  this.iterateDirections((direction, lengths) => {
    const hasStretch = lengths.some(element => isStretch(element))
    const isAlign = this.isAlignedInDirection(direction)

    if (hasStretch && isAlign) {
      throw rule.error(
        'Cannot use stretch values and align on the same axis'
      )
    }

    if (!hasStretch && !isAlign) {
      throw rule.error(
        'Must have at least one stretch value ' +
                'when not specifying align'
      )
    }
  })

  return this
}
