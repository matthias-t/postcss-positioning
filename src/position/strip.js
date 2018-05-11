
// Tells if a string is a calc expressiong
export const isCalc = (length) => {
    return length.slice(0, 5) === 'calc(' &&
        length.slice(-1) === ')';
};

// Turns the last n calc expressions into undefined
export const calcUndef = (lengths, n) => {
    return lengths.reverse().map(length => {
        if (isCalc(length) && n !== 0) {
            n--;
            return undefined;
        } else {
            return length;
        }
    }).reverse();
};

// Remove redundant lengths after processing stretch units
export default function () {
    this.iterateDirections((direction, lengths) => {
        lengths = calcUndef(lengths, 1);
        this.setDirection(direction, lengths);
    });
    return this;
}
