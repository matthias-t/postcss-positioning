import { direction } from '../../../enum'

export default (decl, value, result) => {
  if (value[3] !== 'align') {
    throw decl.error(
      'Expected 3 values, got ' +
            value.length
    )
  }
  if (result.align) {
    throw decl.error(
      'Cannot align both horizontally and vertically'
    )
  }
  if (value.length !== 4 && value.length !== 6) {
    throw decl.error(
      'Expected 0 or 2 values after `align`, got ' +
            (value.length - 4)
    )
  }
  result.align = direction[decl.prop]
  if (value.length === 6) {
    result.margins = {
      first: value[4],
      last: value[5]
    }
  }
}
