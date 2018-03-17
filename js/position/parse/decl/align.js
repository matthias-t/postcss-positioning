import { direction } from '../../../enum';

export default (decl, value, result) => {
    if (value[3] !== 'align') {
        throw decl.error(
            'Expected 3 values, got ' +
            value.length
        );
    }
    if (result.align) {
        throw decl.error(
            'Cannot align both horizontally and vertically'
        );
    }
    if (value.length > 4) {
        throw decl.error(
            'Unexpected value after `align`'
        );
    }
    result.align = direction[decl.prop];
};
