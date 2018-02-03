import postcss from 'postcss';
import parse from './js/parse.js';
import process from './js/process.js';

const isPositionDecl = node => {
    return node.type === 'decl' &&
        ['horizontal', 'vertical', 'type'].some(prop => prop === node.prop);
};

export default postcss.plugin('postcss-position', opts => {
    opts = opts || {};

    // Work with options here

    return (root, result) => {

        root.walkRules( rule => {

            if (!rule.nodes.some(isPositionDecl)) {
                return;
            }

            const position = parse(rule);
            const ast = process(position);
            rule.replaceWith(ast);
        });
    };
});
