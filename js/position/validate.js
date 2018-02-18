import { isStretch } from './stretch';

export default function (rule) {

    if (this.align && this.type) {
        throw rule.error(
            'Cannot align and be ' + this.type
        );
    }

    this.iterateDirections( (direction, lengths) => {
        if (lengths.every(element => !isStretch(element)) &&
            !this.isAlignedInDirection(direction)) {
            throw rule.error(
                'Must have at least one stretch value ' +
                'when not specifying align'
            );
        }
    });

    return this;
}
