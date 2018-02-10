// Parses AST and returns a position object

import Position from './position';
import { isStretch } from './stretch';
import { type, lengths, direction } from '../enum';

export default (rule) => {

    const result = {
        horizontal: {},
        vertical: {}
    };

    rule.walkDecls( decl => {

        const value = decl.value.split(' ');

        // type
        if (decl.prop === 'type') {
            if (result.align) {
                throw rule.error(
                    'Cannot align and be ' + result.type
                );
            }
            if (value.length > 1) {
                throw decl.error(
                    'Cannot have multiple position types'
                );
            }
            if (!type.hasOwnProperty(value[0])) {
                throw decl.error(
                    'Unknown position type `' + value[0] + '`'
                );
            }
            result.type = type[value[0]];

        // horizontal, vertical
        } else if (direction.hasOwnProperty(decl.prop)) {
            if (value.length < 3) {
                throw decl.error(
                    'Must have at least three values: ' +
                    direction.join()
                );
            }
            if (result.type !== type.inline &&
                value.every(element => !isStretch(element))) {
                throw decl.error(
                    'Must have at least one stretch value'
                );
            }

            value.slice(0, 3).forEach( (element, index) => {
                result[decl.prop][lengths[index]] = element;
            });

            // align
            if (value.length > 3) {
                if (value[3] !== 'align') {
                    throw decl.error(
                        'Not specifying `align`, expected 3 values, got' +
                        value.length
                    );
                }
                if (result.align) {
                    throw rule.error(
                        'Cannot align both horizontally and vertically'
                    );
                }
                if (result.type) {
                    throw rule.error(
                        'Cannot align and be ' + result.type
                    );
                }
                if (value.length === 4) {
                    throw decl.error(
                        'You need to specify an offset for `align`'
                    );
                }
                if (value.length > 5) {
                    throw decl.error(
                        'Expected a single align offset, got ' +
                        (value.length - 4) + ' values'
                    );
                }
                result.align = {
                    direction: direction[decl.prop],
                    offset: value[4]
                };
            }
        }
    });

    return new Position(result);
};
