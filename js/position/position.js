// The position data type that stores position info

export default class Position {

    constructor({ horizontal, vertical, align = undefined, type = undefined }) {
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.type = type;
        this.align = align;
    }
}
