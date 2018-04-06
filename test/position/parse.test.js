import postcss from 'postcss';
import Position from '../../js/position/index';
import { type, direction } from '../../js/enum';

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
        }).toThrow('Expected 3 values, got 4');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 1s 10px;
                    vertical: 1s;
                }
            `));
        }).toThrow('Must have at least 3 values');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 10px 10px;
                    vertical: 1s 10vw 1s;
                }
            `));
        }).toThrow('Must have at least one stretch value');
    });

    it('parses alignments', () => {
        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 10px 200px 10px align;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            horizontal: {
                before: '10px',
                size: '200px',
                after: '10px'
            },
            vertical: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            align: direction.horizontal
        });

        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s;
                vertical: 15px 200px 5em align;
            }
        `))).toEqual({
            horizontal: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            vertical: {
                before: '15px',
                size: '200px',
                after: '5em'
            },
            align: direction.vertical
        });

        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s;
                vertical: 5px 200px 22.7em align;
            }
        `))).toEqual({
            horizontal: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            vertical: {
                before: '5px',
                size: '200px',
                after: '22.7em'
            },
            align: direction.vertical
        });
    });

    it('parses alignments with first and last margin shortcuts', () => {
        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 10px 200px 10px align 2px 2px;
                vertical: 1s 200px 1s;
            }
        `))).toEqual({
            horizontal: {
                before: '10px',
                size: '200px',
                after: '10px'
            },
            vertical: {
                before: '1s',
                size: '200px',
                after: '1s'
            },
            margins: {
                first: '2px',
                last: '2px'
            },
            align: direction.horizontal
        });

        expect(Position.parse(postcss.parse(`
            a {
                vertical: 1s 2em 10px;
                horizontal: 1px 200px 2px align 6em 1%;
            }
        `))).toEqual({
            horizontal: {
                before: '1px',
                size: '200px',
                after: '2px'
            },
            vertical: {
                before: '1s',
                size: '2em',
                after: '10px'
            },
            margins: {
                first: '6em',
                last: '1%'
            },
            align: direction.horizontal
        });
    });

    it('throws errors for invalid alignments', () => {
        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 200px 10px align 12px;
                    vertical: 1s 200px 1s;
                }
            `));
        }).toThrow('Expected 0 or 2 values after `align`, got 1');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 200px 10px align 12px 1% 2em;
                    vertical: 1s 200px 1s;
                }
            `));
        }).toThrow('Expected 0 or 2 values after `align`, got 3');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 100px 10px align;
                    vertical: 20px 250px 20px align;
                }
            `));
        }).toThrow('Cannot align both horizontally and vertically');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    type: fixed;
                    horizontal: 10px 100px 10px align;
                    vertical: 1s 100px 1s;
                }
            `));
        }).toThrow('Cannot align and be fixed');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 10px 100px 10px align;
                    vertical: 1s 100px 1s;
                    type: sticky;
                }
            `));
        }).toThrow('Cannot align and be sticky');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align;
                    vertical: 10px 10px 1s;
                }
            `));
        }).toThrow('Cannot use stretch values and align on the same axis');
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
        }).toThrow('Unknown position type `abc`');
        expect(() => {
            Position.parse(postcss.parse(
                `
                a {
                    type: fixed sticky;
                    horizontal: 1s 200px 1s;
                    vertical: 1s 200px 1s;
                }
                `
            ));
        }).toThrow('Cannot have multiple position types');
    });
});
