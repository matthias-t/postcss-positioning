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

const addAll = (array, callbackIfEmpty) => {
    if (array.length === 0) {
        return callbackIfEmpty();
    } else {
        const str = '(' + array[0];
        return array.slice(1).reduce((a, b) => a + ' + ' + b, str) + ')';
    }
};

// Turn all stretch lengths into valid calc expressions
export default function () {

    [ this.horizontal, this.vertical ].forEach( lengths => {

        const stretchValues = Object.values(lengths)
            .filter(isStretch)
            .map(stretchValue);
        const totalStretch = addAll(stretchValues, () => {
            throw new Error('No stretch value found');
        });

        const remainingValues = Object.values(lengths)
            .filter(length => !isStretch(length));
        const totalRemaining = addAll(remainingValues, () => '0');

        Object.entries(lengths).forEach( entry => {
            if (isStretch(entry[1])) {
                lengths[entry[0]] = 'calc((99.9% - ' +
                    totalRemaining + ') * ' +
                    stretchValue(entry[1]) + ' / ' +
                    totalStretch + ')';
                // (100% - totalRemaining) * thisStretch / totalStretch
            }
        });
    });
    return this;
}
