import isAuto from '../../src/position/isAuto'

describe('isAuto', () => {
  it('returns true for auto sizes', () => {
    expect(isAuto('auto')).toEqual(true)
    expect(isAuto('_')).toEqual(true)
  })
  it('returns false for other sizes', () => {
    expect(isAuto('aa')).toEqual(false)
    expect(isAuto('__')).toEqual(false)
    expect(isAuto('AuTo')).toEqual(false)
    expect(isAuto('12.5px')).toEqual(false)
    expect(isAuto('3s')).toEqual(false)
  })
})
