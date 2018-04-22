import postcss from 'postcss';
import process from './process.js';

/* eslint no-unused-vars: "off" */

const isPositionDecl = node => {
    return node.type === 'decl' &&
        ['horizontal', 'vertical', 'type'].some(prop => prop === node.prop);
};

const hasPositionDecl = rule => {
    return rule.nodes.some(isPositionDecl);
};

const defaults = {
    reset: true,
    warn: 'same',
    dev: false
};

module.exports = postcss.plugin('postcss-positioning', opts => {

    opts = {
        ...defaults,
        ...opts
    };

    return (root) => {

        root.walkRules( rule => {

            if (hasPositionDecl(rule)) {
                process(rule);
            }
        });
    };
});
