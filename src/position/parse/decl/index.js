import { direction } from '../../../enum';
import parseType from './type';
import parseDirection from './direction';

export default (decl, result) => {

    const value = decl.value.split(' ');

    if (decl.prop === 'type') {
        parseType(decl, value, result);

    } else if (direction.hasOwnProperty(decl.prop)) {
        parseDirection(decl, value, result);

    } else {
        return;
    }

    decl.remove();
};
