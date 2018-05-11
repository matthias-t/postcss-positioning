import Position from '../../js/position/';
import { isCalc, calcUndef } from '../../js/position/strip';
import { direction } from '../../js/enum';

describe('isCalc', () => {
    it('returns true for calc expressions', () => {
        expect(isCalc('calc()')).toEqual(true);
        expect(isCalc('calc(1px + 1px)')).toEqual(true);
        expect(isCalc('calc(2 * (1px + 5em) / 3)')).toEqual(true);
    });
    it('returns false for others', () => {
        expect(isCalc('a')).toEqual(false);
        expect(isCalc('1px')).toEqual(false);
        expect(isCalc('calc(')).toEqual(false);
        expect(isCalc('(1px + 1px)')).toEqual(false);
    });
});

describe('calcUndef', () => {
    const calc = 'calc()';
    it('turns the n last calc expressions into undefined', () => {

        expect(calcUndef([calc, calc, calc], 1))
            .toEqual([calc, calc, undefined]);
        expect(calcUndef([calc, calc, calc], 2))
            .toEqual([calc, undefined, undefined]);
        expect(calcUndef([calc, calc, calc], 3))
            .toEqual([undefined, undefined, undefined]);

        expect(calcUndef([calc, calc, '1px'], 1))
            .toEqual([calc, undefined, '1px']);
        expect(calcUndef([calc, calc, '1px'], 2))
            .toEqual([undefined, undefined, '1px']);

        expect(calcUndef(['8.5%', calc, '1px'], 1))
            .toEqual(['8.5%', undefined, '1px']);
        expect(calcUndef(['8.5%', calc, '1px'], 2))
            .toEqual(['8.5%', undefined, '1px']);

        expect(calcUndef(['2em', '3%', '1px'], 1))
            .toEqual(['2em', '3%', '1px']);
    });
});

describe('strip', () => {
    it('strips redundant lengths', () => {
        expect(new Position({
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
        }).strip()).toEqual(new Position({
            horizontal: {
                size: '1.3px',
                after: '7.34%'
            },
            vertical: {
                before: '56vw',
                size: '1000px'
            }
        }));
        expect(new Position({
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
        }).strip()).toEqual(new Position({
            horizontal: {
                before: '10px',
                after: '10em'
            },
            vertical: {
                before: 'calc((99.9% - (10vw)) * 1 / (1 + 1))',
                size: '10vw'
            }
        }));
        expect(new Position({
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
        }).strip()).toEqual(new Position({
            horizontal: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            vertical: {
                before: 'calc((99.9% - (10vw)) * 3 / (3 + 1))',
                size: '10vw'
            }
        }));
    });
    it('doesn\'t care about alignments', () => {
        expect(new Position({
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
        }).strip()).toEqual(new Position({
            horizontal: {
                before: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))',
                size: 'calc((99.9% - 0) * 1 / (1 + 1 + 1))'
            },
            vertical: {
                before: '10px',
                size: '10vw',
                after: '4em'
            },
            align: direction.vertical
        }));
    });
});
