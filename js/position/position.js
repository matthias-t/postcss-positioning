// The position data type that stores position info

import { direction } from '../enum';

export default class Position {

    constructor({ horizontal, vertical, align, type }) {
        this.horizontal = horizontal;
        this.vertical = vertical;
        if (align) this.align = align;
        if (type) this.type = type;
    }

    iterateDirections(callback) {
        [
            {
                dir: direction.horizontal,
                lengths: Object.values(this.horizontal)
            }, {
                dir: direction.vertical,
                lengths: Object.values(this.vertical)
            }
        ].forEach(({ dir, lengths }) => {
            callback(dir, lengths);
        });
    }

    setDirection(dir, lengths) {
        this[dir.prop] = {
            before: lengths[0],
            size: lengths[1],
            after: lengths[2]
        };
    }

    isAlignedInDirection(dir) {
        return this.align && this.align === dir;
    }
}
