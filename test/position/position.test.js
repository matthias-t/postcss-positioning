import Position from '../../js/position/position';
import { direction } from '../../src/enum';

describe('iterateLengths', () => {
    it('iterates lengths', () => {
        const position = new Position({
            horizontal: {
                before: '1px',
                after: '2px'
            },
            vertical: {
                before: '3px',
                size: '1px',
                after: '4px'
            }
        });
        const all = [];
        position.iterateLengths( (dir, length, value) => {
            all.push([dir, length, value]);
        });
        expect(all).toEqual([
            [direction.horizontal, 'before', '1px'],
            [direction.horizontal, 'after', '2px'],
            [direction.vertical, 'before', '3px'],
            [direction.vertical, 'size', '1px'],
            [direction.vertical, 'after', '4px']
        ]);
    });
});
