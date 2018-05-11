// Processes positioning for a rule

import Position from './position/';
import isAuto from './position/isAuto';
import { stretchCount, stretchRatio, wrapCalc } from './position/stretch';

export default (rule) => {

    const position = Position.parse(rule).stretch();

    rule.append({
        prop: 'width',
        value: position.horizontal.size
    }, {
        prop: 'height',
        value: position.vertical.size
    });

    if (position.align) {

        // display: block or inline-block depending on the axis
        rule.append({
            prop: 'display',
            value: position.align.display
        });

        // margins
        position.iterateDirections( (direction, lengths) => {
            rule.append({
                prop: 'margin-' + direction.before,
                value: lengths[0]
            }, {
                prop: 'margin-' + direction.after,
                value: lengths[2]
            });
        });

        // first and last margins
        if (position.margins) {

            rule.after({
                selector: rule.selector + ':first-child'
            }).next().append({
                prop: 'margin-' + position.align.before,
                value: position.margins.first
            }).after({
                selector: rule.selector + ':last-child'
            }).next().append({
                prop: 'margin-' + position.align.after,
                value: position.margins.last
            });
        }

    } else {

        let relative = false;
        position.iterateDirections( (direction, lengths) => {
            if (lengths.some(isAuto) && stretchCount(lengths) === 2) {
                position.type = 'relative';

                const ratio = stretchRatio(lengths);
                rule.append({
                    prop: direction.before,
                    value: wrapCalc(ratio)
                });

                const transformValue = direction.transform +
                    '(' + wrapCalc('-' + ratio) + ')';
                if (relative) {
                    const transform = rule.nodes
                        .filter(node => node.prop === 'transform')[0];
                    transform.value += ' ' + transformValue;
                } else {
                    rule.append({
                        prop: 'transform',
                        value: transformValue
                    });
                    relative = true;
                }
            } else {
                // absolute space
                rule.append({
                    prop: direction.before,
                    value: lengths[0]
                });
            }
        });

        if (relative) {
            rule.append({
                prop: 'display',
                value: 'inline-block'
            });
        }

        // position: absolute / relative / static / fixed
        rule.append({
            prop: 'position',
            value: position.type || 'absolute'
        });
    }
};
