// Tell if `length` is a stretch length
export const isStretch = (length) => {
    const unit = length.match(/[A-z]+/);
    return unit !== null && unit[0] === 's';
};
