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

        rule.append({
            prop: 'display',
            value: position.align.display
        });

        rule.append({
            prop: 'margin-' + position.align.before,
            value: position[position.align.prop].before
        }, {
            prop: 'margin-' + position.align.after,
            value: position[position.align.prop].after
        });

        rule.append({
            prop: 'margin-' + direction[position.align.other].before,
            value: position[position.align.other].before
        }, {
            prop: 'margin-' + direction[position.align.other].after,
            value: position[position.align.other].after
        });

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

        rule.append({
            prop: direction.vertical.before,
            value: position.vertical.before
        }, {
            prop: direction.horizontal.before,
            value: position.horizontal.before
        });
    }
};
