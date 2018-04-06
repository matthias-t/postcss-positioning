// Parses AST and returns a position object while removing positioning rules

import Position from '../position';
import parseDecl from './decl/';

export default (rule) => {

    const result = {
        horizontal: {},
        vertical: {}
    };

    rule.walkDecls( decl => {
        parseDecl(decl, result);
    });

    return new Position(result).validate(rule);
};
