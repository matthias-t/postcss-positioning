import isAuto from './isAuto';

// Tell if `length` is a stretch length
export const isStretch = (length) => {
    const unit = length.match(/[A-z]+/);
    return unit !== null && unit[0] === 's';
};

// Get the number before the 's' unit
export const stretchValue = (length) => {
    if (!isStretch(length)) {
        throw new Error(length + ' is not a stretch length');
    }
    return length.slice(0, -1);
};

// How much of these lengths are stretch ?
export const stretchCount = (lengths) => {
    return lengths.filter(isStretch).length;
};

// Get the ratio between the first and last stretch length
export const stretchRatio = (lengths) => {
    const first = stretchValue(lengths[0]);
    const last = stretchValue(lengths[2]);
    return first + ' * 99.9% / (' + first + ' + ' + last + ')';
};

// Wrap calc( ) around a string
export const wrapCalc = (length) => {
    return 'calc(' + length + ')';
};

const addAll = (array) => {
    if (array.length === 0) {
        return undefined;
    } else {
        const str = '(' + array[0];
        return array.slice(1).reduce((a, b) => a + ' + ' + b, str) + ')';
    }
};

// Turn all stretch lengths into valid calc expressions
export default function () {

    this.iterateDirections((direction, lengths) => {

        if (lengths.some(isAuto) || this.isAlignedInDirection(direction)) {
            return;
        }

        const stretchValues = lengths.filter(isStretch)
            .map(stretchValue);
        const totalStretch = addAll(stretchValues);

        const remainingValues = lengths
            .filter(length => !isStretch(length));
        const totalRemaining = addAll(remainingValues) || '0';

        lengths.forEach( (length, i) => {
            if (isStretch(length)) {
                // (99.9% - totalRemaining) * thisStretch / totalStretch
                const expression = '(99.9% - ' +
                    totalRemaining + ') * ' +
                    stretchValue(length) + ' / ' +
                    totalStretch;

                lengths[i] = wrapCalc(expression);
            }
        });

        this.setDirection(direction, lengths);
    });

    return this;
}
