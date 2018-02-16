export const type = {
    fixed: 'fixed',
    sticky: 'sticky'
};

export const direction = {
    horizontal: {
        prop: 'horizontal',
        display: 'inline-block',
        before: 'left',
        size: 'width',
        after: 'right'
    },
    vertical: {
        prop: 'vertical',
        display: 'block',
        before: 'top',
        size: 'height',
        after: 'bottom'
    }
};

export const lengths = [
    'before',
    'size',
    'after'
];
