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

    isAlignedInDirection(dir) {
        return this.align && this.align.direction === dir;
    }
}
