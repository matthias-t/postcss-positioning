import Position from '../../js/position/position';
import { direction } from '../../src/enum';

/* eslint max-len: "off" */

const positionA = new Position({
    horizontal: {
        before: '1s',
        size: '7.3s',
        after: '2px'
    },
    vertical: {
        before: 'calc(5px * 7 / 23)',
        size: '1px',
        after: '0'
    }
});

const positionB = new Position({
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

describe('iterateDirections', () => {
    it('iterates directions', () => {
        const mockA = jest.fn();
        positionA.iterateDirections(mockA);
        expect(mockA).toHaveBeenCalledTimes(2);
        expect(mockA).toHaveBeenCalledWith(
            direction.horizontal, ['1s', '7.3s', '2px']);
        expect(mockA).toHaveBeenLastCalledWith(
            direction.vertical, ['calc(5px * 7 / 23)', '1px', '0']);

        const mockB = jest.fn();
        positionB.iterateDirections(mockB);
        expect(mockB).toHaveBeenCalledTimes(2);
        expect(mockB).toHaveBeenCalledWith(
            direction.horizontal, ['1px', '2px']);
        expect(mockB).toHaveBeenLastCalledWith(
            direction.vertical, ['3px', '1px', '4px']);
    });
});

describe('iterateLengths', () => {
    it('iterates lengths', () => {
        const mockA = jest.fn();
        positionA.iterateLengths(mockA);
        expect(mockA).toHaveBeenCalledTimes(6);
        expect(mockA).toHaveBeenCalledWith(direction.horizontal, 'before', '1s');
        expect(mockA).toHaveBeenCalledWith(direction.horizontal, 'size', '7.3s');
        expect(mockA).toHaveBeenCalledWith(direction.horizontal, 'after', '2px');
        expect(mockA).toHaveBeenCalledWith(direction.vertical, 'before', 'calc(5px * 7 / 23)');
        expect(mockA).toHaveBeenCalledWith(direction.vertical, 'size', '1px');
        expect(mockA).toHaveBeenLastCalledWith(direction.vertical, 'after', '0');

        const mockB = jest.fn();
        positionB.iterateLengths(mockB);
        expect(mockB).toHaveBeenCalledTimes(5);
        expect(mockB).toHaveBeenCalledWith(direction.horizontal, 'before', '1px');
        expect(mockB).toHaveBeenCalledWith(direction.horizontal, 'after', '2px');
        expect(mockB).toHaveBeenCalledWith(direction.vertical, 'before', '3px');
        expect(mockB).toHaveBeenCalledWith(direction.vertical, 'size', '1px');
        expect(mockB).toHaveBeenLastCalledWith(direction.vertical, 'after', '4px');
    });
});
