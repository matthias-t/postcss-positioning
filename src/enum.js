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
        after: 'right',
        transform: 'translateX'
    },
    vertical: {
        prop: 'vertical',
        other: 'horizontal',
        display: 'block',
        before: 'top',
        size: 'height',
        after: 'bottom',
        transform: 'translateY'
    }
};

export const lengths = [
    'before',
    'size',
    'after'
];
