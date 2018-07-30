import { lengths } from '../../../enum'
import parseAlign from './align'

export default (decl, value, result) => {
  if (value.length < 3) {
    throw decl.error(
      'Must have at least 3 values: ' +
            '`before`, `size` and `after`'
    )
  }

  value.slice(0, 3).forEach((element, index) => {
    result[decl.prop][lengths[index]] = element
  })

  if (value.length > 3) {
    parseAlign(decl, value, result)
  }
}
