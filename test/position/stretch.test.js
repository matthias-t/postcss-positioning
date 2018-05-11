import Position from '../../js/position/';
import { isStretch, stretchValue, stretchCount, stretchRatio, wrapCalc }
    from '../../js/position/stretch';
import { direction } from '../../js/enum';

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

describe('stretchCount', () => {
    it('counts the correct number of stretch lengths', () => {
        expect(stretchCount(['1s', '2s', '1s'])).toEqual(3);
        expect(stretchCount(['52s', '1px', '0'])).toEqual(1);
        expect(stretchCount(['1s', 'auto', '34px'])).toEqual(1);
        expect(stretchCount(['3s', 'auto', '6s'])).toEqual(2);
    });
});

describe('stretchRatio', () => {
    it('returns the ratio between the first and last stretch length', () => {
        expect(stretchRatio(['1s', 'auto', '1s']))
            .toEqual('1 * 99.9% / (1 + 1)');
        expect(stretchRatio(['1s', 'auto', '2s']))
            .toEqual('1 * 99.9% / (1 + 2)');
        expect(stretchRatio(['1s', '2s', '3s']))
            .toEqual('1 * 99.9% / (1 + 3)');
        expect(stretchRatio(['2.7s', '10px', '1s']))
            .toEqual('2.7 * 99.9% / (2.7 + 1)');
    });
});

describe('wrapCalc', () => {
    it('wraps string in calc( )', () => {
        expect(wrapCalc('a')).toEqual('calc(a)');
        expect(wrapCalc('10px + 20px')).toEqual('calc(10px + 20px)');
        expect(wrapCalc('2 * 5px / (1 + 2)'))
            .toEqual('calc(2 * 5px / (1 + 2))');
    });
});

// Complex calc expressions that can be simplified are OK here
// Because postcss-calc is supposed to simplify them
describe('stretch', () => {

    it('transforms stretch values into calc expressions', () => {
        expect(new Position({
            horizontal: {
                before: '1s',
                size: '1.3px',
                after: '7.34%'
            },
            vertical: {
                before: '56vw',
                size: '1000px',
                after: '1s'
            }
        }).stretch()).toEqual(new Position({
            horizontal: {
                before: 'calc((99.9% - (1.3px + 7.34%)) * 1 / (1))',
                size: '1.3px',
                after: '7.34%'
            },
            vertical: {
                before: '56vw',
                size: '1000px',
                after: 'calc((99.9% - (56vw + 1000px)) * 1 / (1))'
            }
        }));
        expect(new Position({
            horizontal: {
                before: '10px',
                size: '1s',
                after: '10em'
            },
            vertical: {
                before: '1s',
                size: '10vw',
                after: '1s'
            }
        }).stretch()).toEqual(new Position({
            horizontal: {
                before: '10px',
                size: 'calc((99.9% - (10px + 10em)) * 1 / (1))',
                after: '10em'
            },
            vertical: {
                before: 'calc((99.9% - (10vw)) * 1 / (1 + 1))',
                size: '10vw',
                after: 'calc((99.9% - (10vw)) * 1 / (1 + 1))'
            }
        }));
        expect(new Position({
            horizontal: {
                before: '1s',
                size: '1s',
                after: '1s'
            },
            vertical: {
                before: '3s',
                size: '10vw',
                after: '1s'
            }
        }).stretch()).toEqual(new Position({
            horizontal: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                after: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            vertical: {
                before: 'calc((99.9% - (10vw)) * 3 / (3 + 1))',
                size: '10vw',
                after: 'calc((99.9% - (10vw)) * 1 / (3 + 1))'
            }
        }));
    });

    it('handles alignments correctly', () => {
        expect(new Position({
            horizontal: {
                before: '1s',
                size: '1s',
                after: '1s'
            },
            vertical: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            align: direction.vertical
        }).stretch()).toEqual(new Position({
            horizontal: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                after: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            vertical: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            align: direction.vertical
        }));
        expect(new Position({
            horizontal: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            vertical: {
                before: '1s',
                size: '1s',
                after: '1s'
            },
            align: direction.horizontal
        }).stretch()).toEqual(new Position({
            horizontal: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            vertical: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                after: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            align: direction.horizontal
        }));
        expect(new Position({
            horizontal: {
                before: '1s',
                size: '1s',
                after: '1s'
            },
            vertical: {
                before: '10px',
                size: '10vw',
                after: '10px'
            },
            align: direction.vertical
        }).stretch()).toEqual(new Position({
            horizontal: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                after: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            vertical: {
                before: '10px',
                size: '10vw',
                after: '10px'
            },
            align: direction.vertical
        }));
    });
});
