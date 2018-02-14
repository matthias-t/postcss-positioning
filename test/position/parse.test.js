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
        }).toThrow('Not specifying `align`, expected 3 values, got 4');

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

        expect(Position.parse(postcss.parse(`
            a {
                horizontal: 1s 200px 1s;
                vertical: 5px 200px 22.7em align 0;
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
            align: {
                direction: direction.vertical,
                offset: '0'
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
        }).toThrow('Expected a single align offset, got 2 values');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s align 20px;
                }
            `));
        }).toThrow('Cannot align both horizontally and vertically');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    type: fixed;
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                }
            `));
        }).toThrow('Cannot align and be fixed');

        expect(() => {
            Position.parse(postcss.parse(`
                a {
                    horizontal: 1s 100px 1s align 1px;
                    vertical: 1s 100px 1s;
                    type: sticky;
                }
            `));
        }).toThrow('Cannot align and be sticky');
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
