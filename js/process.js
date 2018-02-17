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

        const halfOffset = 'calc(' + position.align.offset + ' / 2)';

        rule.append({
            prop: 'display',
            value: position.align.direction.display
        });

        rule.append({
            prop: 'margin-' + position.align.direction.before,
            value: halfOffset
        }, {
            prop: 'margin-' + position.align.direction.after,
            value: halfOffset
        });

        rule.after({
            selector: rule.selector + ':first-child'
        }).next().append({
            prop: 'margin-' + position.align.direction.before,
            value: position[position.align.direction.prop].before
        }).after({
            selector: rule.selector + ':last-child'
        }).next().append({
            prop: 'margin-' + position.align.direction.after,
            value: position[position.align.direction.prop].after
        });

        rule.append({
            prop: 'margin-' + direction[position.align.direction.other].before,
            value: position[position.align.direction.other].before
        }, {
            prop: 'margin-' + direction[position.align.direction.other].after,
            value: position[position.align.direction.other].after
        });

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
