import postcss from 'postcss';
import process from './js/process.js';

/* eslint no-unused-vars: "off" */

const isPositionDecl = node => {
    return node.type === 'decl' &&
        ['horizontal', 'vertical', 'type'].some(prop => prop === node.prop);
};

const hasPositionDecl = rule => {
    return rule.nodes.some(isPositionDecl);
};

export default postcss.plugin('postcss-positioning', opts => {
    opts = opts || {};

    // Work with options here

    return (root) => {

        root.walkRules( rule => {

            if (hasPositionDecl(rule)) {
                process(rule);
            }
        });
    };
});
