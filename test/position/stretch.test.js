import { isStretch, stretchValue } from '../../js/position/stretch';

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

describe('stretchValue', () => {

    it('returns the value of a stretch length', () => {
        expect(stretchValue('1s')).toEqual('1');
        expect(stretchValue('200s')).toEqual('200');
        expect(stretchValue('3.1415s')).toEqual('3.1415');
        expect(stretchValue('0.3s')).toEqual('0.3');
    });

    it('throws errors for non-stretch lengths', () => {
        expect(() => stretchValue('34px')).toThrow();
        expect(() => stretchValue('34abs')).toThrow();
    });
});
