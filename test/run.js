import postcss from 'postcss';
import plugin from '../';

export default (input, output, opts) => {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
};
