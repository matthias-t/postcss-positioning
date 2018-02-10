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
