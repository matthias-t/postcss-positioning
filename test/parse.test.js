import postcss from 'postcss';
import Position from '../js/position/index';
import { type, direction } from '../js/enum';

describe('parse', () => {

    it('parses simple declarations', () => {
        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 10px 1s 10px;
                vertical: 1s 10vw 1s;
            }
        `))).toEqual({
            horizontal: {
                before: '10px',
                size: '1s',
                after: '10px'
            },
            vertical: {
                before: '1s',
                size: '10vw',
                after: '1s'
            }
        });
    });

    it('throws errors for invalid declarations', () => {
        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 1s 10px 10px;
                    vertical: 1s 10vw 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 1s 10px;
                    vertical: 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 10px 10px;
                    vertical: 1s 10vw 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);
    });

    it('parses alignments', () => {
        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s align 25px;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            horizontal: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            vertical: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            align: {
                direction: direction.horizontal,
                offset: '25px'
            }
        });

        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s;
                vertical: 1s 200px 1s align 4vw;
            }
        `))).toEqual({
            horizontal: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            vertical: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            align: {
                direction: direction.vertical,
                offset: '4vw'
            }
        });
    });

    it('throws errors for invalid alignments', () => {
        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 1s 200px 1s align 1vw 10em;
                    vertical: 1s 200px 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s align 20px;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    type: fixed;
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    type: inline;
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                    type: sticky;
                }
            `));
        }).toThrow(postcss.CssSyntaxError);
    });

    it('parses types', () => {
        expect(Position.parse(postcss.parse(`
            a {
                type: fixed;
                horizontal: 1s 200px 1s;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            type: type.fixed,
            horizontal: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            vertical: {
                before: '1s',
                size: '200px',
                after: '1s'
            }
        });

        expect(Position.parse(postcss.parse(`
            a {
                type: inline;
                horizontal: .3em 200px .3em;
                vertical: 10px 200px 10px;
            }
        `))).toEqual({
            type: type.inline,
            horizontal: {
                before: '.3em',
                size: '200px',
                after: '.3em'
            },
            vertical: {
                before: '10px',
                size: '200px',
                after: '10px'
            }
        });

        expect(Position.parse(postcss.parse(`
            a {
                type: sticky;
                horizontal: 1s 200px 1s;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            type: type.sticky,
            horizontal: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            vertical: {
                before: '1s',
                size: '200px',
                after: '1s'
            }
        });
    });

    it('throws errors for invalid types', () => {
        expect(() => {
            Position.parse(postcss.parse(
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
            Position.parse(postcss.parse(
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
