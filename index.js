import postcss from 'postcss';
import process from './js/process.js';

const isPositionDecl = node => {
    return node.type === 'decl' &&
        ['horizontal', 'vertical', 'type'].some(prop => prop === node.prop);
};

export default postcss.plugin('postcss-positioning', opts => {
    opts = opts || {};

    // Work with options here

    return (root) => {

        root.walkRules( rule => {

            if (rule.nodes.some(isPositionDecl)) {
                process(rule);
            }
        });
    };
});
