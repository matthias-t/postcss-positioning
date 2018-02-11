// The position data type that stores position info

export default class Position {

    constructor({ horizontal, vertical, align, type }) {
        this.horizontal = horizontal;
        this.vertical = vertical;
        if (align) this.align = align;
        if (type) this.type = type;
    }
}
