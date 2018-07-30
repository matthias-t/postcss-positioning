import { type } from '../../../enum'

export default (decl, value, result) => {
  if (value.length > 1) {
    throw decl.error(
      'Cannot have multiple position types'
    )
  }
  if (!type.hasOwnProperty(value[0])) {
    throw decl.error(
      'Unknown position type `' + value[0] + '`'
    )
  }
  result.type = type[value[0]]
}
