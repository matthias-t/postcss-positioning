import { minimal, full } from '../src/reset'
import run from './run'

describe('options', () => {
  it('reset', () => {
    return Promise.all([
      run('', minimal, {}),
      run('', minimal, { reset: 'minimal' }),
      run('', full, { reset: 'full' }),
      run('', '', { reset: false }),
      run('a {}', minimal + '\na {}', {})
    ])
  })
})
