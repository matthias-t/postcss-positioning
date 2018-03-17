import { direction } from '../enum';

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

    this.iterateDirections((dir, lengths) => {

        const stretchValues = lengths.filter(isStretch)
            .map(stretchValue);
        const totalStretch = addAll(stretchValues);

        if (totalStretch === undefined) {
            if (this.isAlignedInDirection(dir)) {
                return;
            } else {
                throw new Error('No stretch value found');
            }
        }

        const remainingValues = lengths
            .filter(length => !isStretch(length));
        const totalRemaining = addAll(remainingValues) || '0';

        lengths.forEach( (length, i) => {
            if (isStretch(length)) {
                lengths[i] = 'calc((99.9% - ' +
                    totalRemaining + ') * ' +
                    stretchValue(length) + ' / ' +
                    totalStretch + ')';
                // (100% - totalRemaining) * thisStretch / totalStretch
            }
        });

        this.setDirection(dir, lengths);
    });

    return this;
}
