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
    position: absolute;
    top: calc((99.9% - (10px)) * 1 / (1 + 1));
    left: calc((99.9% - (10px)) * 1 / (1 + 1));
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
    margin-top: 20px;
    margin-bottom: 25px;
    margin-left: 10px;
    margin-right: 10px
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
    margin-top: 20px;
    margin-bottom: 25px;
    margin-left: 10px;
    margin-right: 10px
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
