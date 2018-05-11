// The position data type that stores position info

import { direction } from '../enum';

export default class Position {

    constructor({ horizontal, vertical, align, type, margins }) {
        this.horizontal = horizontal;
        this.vertical = vertical;
        if (align) this.align = align;
        if (type) this.type = type;
        if (margins) this.margins = margins;
    }

    iterableDirections() {
        return [
            {
                dir: direction.horizontal,
                lengths: this.horizontal
            },
            {
                dir: direction.vertical,
                lengths: this.vertical
            }
        ];
    }

    iterateDirections(callback) {
        this.iterableDirections().forEach( ({ dir, lengths }) => {
            callback(dir, Object.values(lengths));
        });
    }

    iterateLengths(callback) {
        this.iterableDirections().forEach( ({ dir, lengths }) => {
            Object.entries(lengths).forEach( ([key, value]) => {
                callback(dir, key, value);
            });
        });
    }

    // Set lengths for a direction, ignoring undefined
    setDirection(dir, lengths) {
        this[dir.prop] = {
            ...lengths[0] && { before: lengths[0] },
            ...lengths[1] && { size: lengths[1] },
            ...lengths[2] && { after: lengths[2] }
        };
    }

    isAlignedInDirection(dir) {
        return this.align && this.align === dir;
    }
}
