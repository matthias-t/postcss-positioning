import run from './run';

/* eslint indent: "off" */

describe('postcss-positioning', () => {
    it('transforms basic position declarations', () => {
        return run(
`a {
    horizontal: 1s 10px 1s;
    vertical: 1s 10px 1s;
}`,
`a {
    width: 10px;
    height: 10px;
    left: calc((99.9% - (10px)) * 1 / (1 + 1));
    top: calc((99.9% - (10px)) * 1 / (1 + 1));
    position: absolute;
}`,
        { reset: false });
    });

    it('processes horizontal alignments', () => {
        return run(
`a {
    vertical: 10px 1s 10px;
    horizontal: 25px 70vw 20px align;
}`,
`a {
    width: 70vw;
    height: calc((99.9% - (10px + 10px)) * 1 / (1));
    display: inline-block;
    margin-left: 25px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}`,
        { reset: false });
    });

    it('processes vertical alignments', () => {
        return run(
`a {
    vertical: 20px 100px 25px align;
    horizontal: 10px 1s 10px
}`,
`a {
    width: calc((99.9% - (10px + 10px)) * 1 / (1));
    height: 100px;
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    margin-bottom: 25px
}`,
        { reset: false });
    });

    it('processes alignments with margin shortcuts', () => {
        return Promise.all([
            run(
`a {
    vertical: 20px 100px 25px align 0 1%;
    horizontal: 10px 1s 10px
}`,
`a {
    width: calc((99.9% - (10px + 10px)) * 1 / (1));
    height: 100px;
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    margin-bottom: 25px
}
a:first-child {
    margin-top: 0
}
a:last-child {
    margin-bottom: 1%
}`,
            { reset: false }), run(
`a {
    vertical: 10px 1s 10px;
    horizontal: 25px 70vw 20px align 52px 4em;
}`,
`a {
    width: 70vw;
    height: calc((99.9% - (10px + 10px)) * 1 / (1));
    display: inline-block;
    margin-left: 25px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
a:first-child {
    margin-left: 52px;
}
a:last-child {
    margin-right: 4em;
}`,
            { reset: false })
        ]);
    });

    it('processes auto sizes with one stretch unit', () => {
        return run(
`a {
    horizontal: 0 auto 1s;
    vertical: 1s 50% 1s;
}`, `a {
    width: auto;
    height: 50%;
    left: 0;
    top: calc((99.9% - (50%)) * 1 / (1 + 1));
    position: absolute;
}`,
        { reset: false });
    });

    it('processes auto sizes with two stretch units', () => {
        return Promise.all([
            run(
`a {
    horizontal: 1s auto 1s;
    vertical: 1s 50% 1s;
}`,
`a {
    width: auto;
    height: 50%;
    left: calc(1 * 99.9% / (1 + 1));
    transform: translateX(calc(-1 * 99.9% / (1 + 1)));
    top: calc((99.9% - (50%)) * 1 / (1 + 1));
    display: inline-block;
    position: relative;
}`,
            { reset: false }), run(
`a {
    horizontal: 0 20% 1s;
    vertical: 3s auto 2s;
}`, `a {
    width: 20%;
    height: auto;
    left: 0;
    top: calc(3 * 99.9% / (3 + 2));
    transform: translateY(calc(-3 * 99.9% / (3 + 2)));
    display: inline-block;
    position: relative;
}`,
            { reset: false })
        ]);
    });

    it('processes auto sizes with alignments', () => {
        return run(
`a {
    horizontal: 0 1s 0;
    vertical: 10px auto 10px align;
}`,
`a {
    width: calc((99.9% - (0 + 0)) * 1 / (1));
    height: auto;
    display: block;
    margin-left: 0;
    margin-right: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}`,
        { reset: false });
    });

    it('ignores other declarations', () => {
        return run(
`a {
    color: red;
}`,
`a {
    color: red;
}`,
        { reset: false });
    });
});
