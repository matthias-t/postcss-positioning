// Successively combines transforms into a single declaration

import { wrapCalc } from './position/stretch';

export const transformValue = (direction, ratio) => {
    return direction.transform + '(' + wrapCalc('-' + ratio) + ')';
};

let declaration;

export const resetDeclaration = () => {
    declaration = undefined;
};

export default (rule, direction, ratio) => {

    const value = transformValue(direction, ratio);

    if (declaration) {
        declaration.value += ' ' + value;
    } else {
        declaration = rule.append({
            prop: 'transform',
            value
        }).last;
        rule.append({
            prop: 'display',
            value: 'inline-block'
        });
    }
};
