import Position from '../../js/position/index';
import { isStretch, stretchValue } from '../../js/position/stretch';
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

// Complex calc expressions that can be simplified are OK here
// Because postcss-calc is supposed to simplify them
describe('stretch', () => {

    it('transforms stretch values into calc expressions', () => {
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
            align: {
                direction: direction.vertical,
                offset: '2px'
            }
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
            align: {
                direction: direction.vertical,
                offset: '2px'
            }
        }));
        expect(new Position({
            vertical: {
                before: '1s',
                size: '1s',
                after: '1s'
            },
            horizontal: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            align: {
                direction: direction.horizontal,
                offset: '2px'
            }
        }).stretch()).toEqual(new Position({
            vertical: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                after: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            horizontal: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            align: {
                direction: direction.horizontal,
                offset: '2px'
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
            },
            align: {
                direction: direction.vertical,
                offset: '2px'
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
            },
            align: {
                direction: direction.vertical,
                offset: '2px'
            }
        }));
    });
});
