import postcss from 'postcss';
import parse from '../js/parse';
import { type, direction } from '../js/enum';

describe('parse', () => {

    it('parses simple declarations', () => {
        expect(parse(postcss.parse(`
            a {
                horizontal: 10px 1s 10px;
                vertical: 1s 10vw 1s;
            }
        `))).toEqual({
            left: '10px',
            width: '1s',
            right: '10px',
            top: '1s',
            height: '10vw',
            bottom: '1s'
        });
    });

    it('throws errors for invalid declarations', () => {
        expect(() => {
            parse(postcss.parse(`
                a {
                    horizontal: 10px 1s 10px 10px;
                    vertical: 1s 10vw 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            parse(postcss.parse(`
                a {
                    horizontal: 10px 1s 10px;
                    vertical: 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            parse(postcss.parse(`
                a {
                    horizontal: 10px 10px 10px;
                    vertical: 1s 10vw 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);
    });

    it('parses alignments', () => {
        expect(parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s align 25px;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            left: '1s',
            width: '200px',
            right: '1s',
            top: '1s',
            height: '200px',
            bottom: '1s',
            align: {
                direction: direction.horizontal,
                offset: '25px'
            }
        });

        expect(parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s;
                vertical: 1s 200px 1s align 4vw;
            }
        `))).toEqual({
            left: '1s',
            width: '200px',
            right: '1s',
            top: '1s',
            height: '200px',
            bottom: '1s',
            align: {
                direction: direction.vertical,
                offset: '4vw'
            }
        });
    });

    it('throws errors for invalid alignments', () => {
        expect(() => {
            parse(postcss.parse(`
                a {
                    horizontal: 1s 200px 1s align 1vw 10em;
                    vertical: 1s 200px 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s align 20px;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            parse(postcss.parse(`
                a {
                    type: fixed;
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            parse(postcss.parse(`
                a {
                    type: inline;
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                    type: sticky;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);
    });

    it('parses types', () => {
        expect(parse(postcss.parse(`
            a {
                type: fixed;
                horizontal: 1s 200px 1s;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            left: '1s',
            width: '200px',
            right: '1s',
            top: '1s',
            height: '200px',
            bottom: '1s',
            type: type.fixed
        });

        expect(parse(postcss.parse(`
            a {
                type: inline;
                horizontal: .3em 200px .3em;
                vertical: 10px 200px 10px;
            }
        `))).toEqual({
            left: '.3em',
            width: '200px',
            right: '.3em',
            top: '10px',
            height: '200px',
            bottom: '10px',
            type: type.inline
        });

        expect(parse(postcss.parse(`
            a {
                type: sticky;
                horizontal: 1s 200px 1s;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            left: '1s',
            width: '200px',
            right: '1s',
            top: '1s',
            height: '200px',
            bottom: '1s',
            type: type.sticky
        });
    });

    it('throws errors for invalid types', () => {
        expect(() => {
            parse(postcss.parse(
                `
                a {
                    type: abc;
                    horizontal: 1s 200px 1s;
                    vertical: 1s 200px 1s;
                }
                `
            ));
        }).toThrow(postcss.CssSyntaxError);
        expect(() => {
            parse(postcss.parse(
                `
                a {
                    type: fixed inline;
                    horizontal: 1s 200px 1s;
                    vertical: 1s 200px 1s;
                }
                `
            ));
        }).toThrow(postcss.CssSyntaxError);
    });
});
