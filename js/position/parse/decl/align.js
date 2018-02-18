import { direction } from '../../../enum';

export default (decl, value, result) => {
    if (value[3] !== 'align') {
        throw decl.error(
            'Not specifying `align`, expected 3 values, got ' +
            value.length
        );
    }
    if (result.align) {
        throw decl.error(
            'Cannot align both horizontally and vertically'
        );
    }
    if (value.length === 4) {
        throw decl.error(
            'You need to specify an offset for `align`'
        );
    }
    if (value.length > 5) {
        throw decl.error(
            'Expected a single align offset, got ' +
            (value.length - 4) + ' values'
        );
    }
    result.align = {
        direction: direction[decl.prop],
        offset: value[4]
    };
};
