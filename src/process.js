// Processes positioning for a rule

import Position from './position/index';
import { direction } from './enum';

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
        position.iterateDirections( (_direction, lengths) => {
            rule.append({
                prop: 'margin-' + _direction.before,
                value: lengths[0]
            }, {
                prop: 'margin-' + _direction.after,
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

        // position: absolute / static / fixed
        if (position.type) {
            rule.append({
                prop: 'position',
                value: position.type
            });
        } else {
            rule.append({
                prop: 'position',
                value: 'absolute'
            });
        }

        // absolute space
        rule.append({
            prop: direction.vertical.before,
            value: position.vertical.before
        }, {
            prop: direction.horizontal.before,
            value: position.horizontal.before
        });
    }
};
