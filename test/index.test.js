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
        {});
    });

    it('processes horizontal alignments', () => {
        return run(
`a {
    vertical: 10px 1s 10px;
    horizontal: 10px 70vw 10px align 2px;
}`,
`a {
    width: 70vw;
    height: calc((99.9% - (10px + 10px)) * 1 / (1));
    display: inline-block;
    margin-left: calc(2px / 2);
    margin-right: calc(2px / 2);
    margin-top: 10px;
    margin-bottom: 10px;
}
a:first-child {
    margin-left: 10px;
}
a:last-child {
    margin-right: 10px;
}`,
        {});
    });

    it('processes vertical alignments', () => {
        return run(
`a {
    vertical: 20px 100px 25px align 10px;
    horizontal: 10px 1s 10px
}`,
`a {
    width: calc((99.9% - (10px + 10px)) * 1 / (1));
    height: 100px;
    display: block;
    margin-top: calc(10px / 2);
    margin-bottom: calc(10px / 2);
    margin-left: 10px;
    margin-right: 10px
}
a:first-child {
    margin-top: 20px
}
a:last-child {
    margin-bottom: 25px
}`,
        {});
    });
});
