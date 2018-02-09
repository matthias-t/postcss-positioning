import { isStretch } from '../../js/position/stretch';

describe('isStretch', () => {

    it('recognizes stretch lengths', () => {
        expect(isStretch('1s')).toEqual(true);
        expect(isStretch('200s')).toEqual(true);
        expect(isStretch('4.292473s')).toEqual(true);
    });

    it('recognizes non-stretch lengths', () => {
        expect(isStretch('1px')).toEqual(false);
        expect(isStretch('5em')).toEqual(false);
        expect(isStretch('0.5819%')).toEqual(false);
        expect(isStretch('10')).toEqual(false);
        expect(isStretch('20cs')).toEqual(false);
    });
});
