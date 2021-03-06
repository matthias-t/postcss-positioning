<h1 align="center" id="title">
    <img src="https://raw.githubusercontent.com/matthias-t/postcss-positioning/master/img/logo.png" width="600px" align="center" />
</h1>

[![npm][npm-img]][npm]
[![Build Status][ci-img]][ci]

Rethinking CSS positioning with [PostCSS].

[PostCSS]:     https://github.com/postcss/postcss

[ci-img]:      https://travis-ci.org/matthias-t/postcss-positioning.svg
[ci]:          https://travis-ci.org/matthias-t/postcss-positioning

[npm-img]: 	   https://img.shields.io/npm/v/postcss-positioning.svg
[npm]:         https://npmjs.org/package/postcss-positioning


## Why?

Positioning in CSS is painful.

Forget about `display`, `position`, `margin`, `padding`, absolute space, and all the complicated flexbox properties.

Now think about it as *spacing*. You have an element. It has a size. And you've got some space before, and some space after it. With postcss-positioning, all you need is two properties, `horizontal` and `vertical`.


## Examples

#### Center an element

<img alt="centered element" src="https://raw.githubusercontent.com/matthias-t/postcss-positioning/master/img/illustration1.png" width="70%" />

```css
.child {
  horizontal: 1s 200px 1s;
  vertical: 1s 200px 1s;
}
```

#### Take up two thirds of the space on the right

<img alt="element taking up two thirds of its container to the right" src="https://raw.githubusercontent.com/matthias-t/postcss-positioning/master/img/illustration2.png" width="70%" />

```css
.element {
  horizontal: 1s 2s 0;
  vertical: 0 1s 0;
}
```

## How it works

```css
.element {
  horizontal: right width left;
  vertical: top height bottom;
}
```
The values specify *space before*, *size*, and *space after* on both axes. Remaining space is distributed between stretch lengths (ending with `s`). Read the [documentation](https://github.com/matthias-t/postcss-positioning/wiki/Documentation) to learn about elements with non-absolute positioning.

A CSS reset is performed by default, so user agents won't interfere with the positioning. See [options](https://github.com/matthias-t/postcss-positioning/wiki/Setup#2--options-1) if you want to disable it.

Because postcss-positioning is a PostCSS plugin, it only processes `horizontal` and `vertical`, and leaves the rest of your CSS in place. If you come around a situation where you prefer to use common CSS positioning, nothing stops you from doing so.


## Setup
If you are not familiar with PostCSS, head to the [wiki](https://github.com/matthias-t/postcss-positioning/wiki/Setup) for detailed instructions.
```bash
npm install --save-dev postcss-positioning postcss-calc
```
```js
module.exports = {
    plugins: [
        require('postcss-positioning')({ /* options */ }),
        require('postcss-calc')()
    ]
}
```

***

Part of this project is inspired by Kevin Lynagh's [talk][talk] at Deconstruct 2017.

[talk]: https://www.deconstructconf.com/2017/kevin-lynagh-choosing-features
