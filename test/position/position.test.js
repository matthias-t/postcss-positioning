import Position from '../../js/position/position';
import { direction } from '../../src/enum';

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

describe('iterateLengths', () => {
    it('iterates lengths', () => {
        const mock = jest.fn();
        position.iterateLengths(mock);
        expect(mock).toHaveBeenCalledTimes(5);
        expect(mock).toHaveBeenCalledWith(direction.horizontal, 'before', '1px');
        expect(mock).toHaveBeenCalledWith(direction.horizontal, 'after', '2px');
        expect(mock).toHaveBeenCalledWith(direction.vertical, 'before', '3px');
        expect(mock).toHaveBeenCalledWith(direction.vertical, 'size', '1px');
        expect(mock).toHaveBeenLastCalledWith(direction.vertical, 'after', '4px');
    });
});
