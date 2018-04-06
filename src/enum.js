export const type = {
    fixed: 'fixed',
    sticky: 'sticky'
};

export const direction = {
    horizontal: {
        prop: 'horizontal',
        other: 'vertical',
        display: 'inline-block',
        before: 'left',
        size: 'width',
        after: 'right'
    },
    vertical: {
        prop: 'vertical',
        other: 'horizontal',
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
