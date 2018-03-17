:warning: :construction: **Attention**: This plugin is still in development. Some features detailed in this README aren't working just yet.

# PostCSS-Positioning [![Build Status][ci-img]][ci] [![Coverage][cov-img]][cov] [![Maintainability][climate-img]][climate] [![Dependencies][deps-img]][deps]

[![npm][npm-img]][npm]
[![Downloads][dwn-img]][npm]
[![Contributions Welcome][contrib-img]][contrib]
[![Donate Coffee][donate-img]][coffee]

Rethinking CSS positioning with [PostCSS].

[PostCSS]:     https://github.com/postcss/postcss

[ci-img]:      https://travis-ci.org/matthias-t/postcss-positioning.svg
[ci]:          https://travis-ci.org/matthias-t/postcss-positioning

[cov-img]:     https://img.shields.io/codeclimate/coverage/github/matthias-t/postcss-positioning.svg
[cov]:         https://codeclimate.com/github/matthias-t/postcss-positioning

[climate-img]: https://img.shields.io/codeclimate/maintainability/matthias-t/postcss-positioning.svg
[climate]:     https://codeclimate.com/github/matthias-t/postcss-positioning

[deps-img]:    https://david-dm.org/matthias-t/postcss-positioning.svg
[deps]:        https://github.com/matthias-t/postcss-positioning/blob/master/package.json

[npm-img]: 	   https://img.shields.io/npm/v/postcss-positioning.svg
[dwn-img]:     https://img.shields.io/npm/dt/postcss-positioning.svg
[npm]:         https://npmjs.org/package/postcss-positioning

[contrib-img]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg
[contrib]:     https://github.com/matthias-t/postcss-positioning/projects

[donate-img]:  https://img.shields.io/badge/donate-coffee-brightgreen.svg
[coffee]:      https://www.buymeacoffee.com/matthiast

[why-img]:     https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg


## Why? ![Start With Why][why-img]

Positioning in CSS is painful.

Forget about `display`, `position`, `margin`, `padding`, absolute space, and all the complicated flexbox properties.

Now think about it as *spacing*. You have an element. It has a size. And you've got some space before, and some space after it.

With PostCSS-Positioning, all you need is two properties, `horizontal` and `vertical`. It lets you use a coherent system where spacing and positioning are defined in a consistent way.


## Table of contents

#### 0 &nbsp; [PostCSS-Positioning](#postcss-positioning----)
 &nbsp; 0.1 &nbsp;[Why?](#why-) <br>
 &nbsp; 0.2 &nbsp;[Table of contents](#table-of-contents)

#### 1 &nbsp; [Syntax](#1--syntax-1)
 &nbsp; 1.1 &nbsp;[*Example:* Centering stuff](#11-example-centering-stuff) <br>
 &nbsp; 1.2 &nbsp;[Basic syntax](#12-basic-syntax) <br>
 &nbsp; 1.3 &nbsp;[Stretch units](#13-stretch-units) <br>
 &nbsp; 1.4 &nbsp;[Padding](#14-padding)

#### 2 &nbsp;[`align`](#2--align)
 &nbsp; 2.1 &nbsp;[*Example:* Aligning children](#21-example-aligning-children) <br>
 &nbsp; 2.2 &nbsp;[The `align` keyword](#22-the-align-keyword)

#### 3 &nbsp; [The `_` Underscore](#3--the-_-underscore-1)
 &nbsp; 3.1 &nbsp;[*Example:* Keeping aspect ratios](#31-example-keeping-aspect-ratios) <br>
 &nbsp; 3.2 &nbsp;[*Example:* Matching content](#32-example-matching-content) <br>
 &nbsp; 3.3 &nbsp;[The `_` keyword](#33-the-_-keyword)

#### 4 &nbsp; [Getting Started](#4--getting-started-1)
 &nbsp; 4.1 &nbsp;[Installation](#41-installation) <br>
 &nbsp; 4.2 &nbsp;[Usage](#42-usage) <br>
 &nbsp; 4.3 &nbsp;[Options](#43-options)

#### 5 &nbsp; [Community](#5--community-1)
 &nbsp; 5.1 &nbsp;[Questions? Feedback?](#51-questions-feedback) <br>
 &nbsp; 5.2 &nbsp;[Acknowledgements](#52-acknowledgements) <br>
 &nbsp; 5.3 &nbsp;[Support PostCSS-Positioning](#53-support-postcss-positioning)


# 1 &nbsp; Syntax

## 1.1 &nbsp;*Example:* Centering stuff

#### Without postcss-positioning
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.child {
  height: 200px;
  width: 200px;
}
```
Well, there's [lots of ways](https://stackoverflow.com/questions/19461521/how-to-center-an-element-horizontally-and-vertically).
#### With postcss-positioning
```css
.child {
  horizontal: 1s 200px 1s;
  vertical: 1s 200px 1s;
}
```
We believe the childrens position should not be defined by style on the parent.


## 1.2 &nbsp;Basic syntax

> "*What are those values doing?*"

The values specify space before, size, and space after on both axes.

```css
.element {
  horizontal: right width left;
  vertical: top height bottom;
}
```


## 1.3 &nbsp;Stretch units

> "*Okay, but what is `1s`?*"

Sometimes, you do not want to specify exact values for lengths, but you are interested in relations between them.

That's essentially what happens when you center stuff — you don't care how long exactly the space before and after the element is. But you want to express that they should be equal.

Want an element to take up two thirds of the space of its container to the right?
```css
.element {
  horizontal: 1s 2s 0;
  vertical: 0 1s 0;
}
```

When you specify lengths with stretch units, they will be processed last, and all the remaining space will be distributed between them.


## 1.4 &nbsp;Padding

> "*But I want my padding!*"

Okay, let's recap. You have an element. There should be space between your element and the text inside it. So you want text inside it that has not the same size as your element.

Sounds to me like you actually have two elements. Your container, and your text. And they have different sizes. And you want to cheat to have one less element in your markup.

**We want to have two elements where you can see two elements.**

#### Without postcss-positioning
```html
<div class="container">
    I am a cheater. I am actually two elements.
</div>
```
```css
.container {
    width: 200px;
    height: 200px;
    padding: 20px;
}
```

#### With postcss-positioning
```html
<div class="container">
    <p>
        I am explicitly a different size than my parent.
    </p>
</div>
```
```css
.container {
    horizontal: 0 200px 0;
    vertical: 0 200px 0;
}

.container p {
    horizontal: 20px 1s 20px;
    vertical: 20px 1s 20px;
}
```

You may think this is cluttered, or too explicit. You mustn't agree with this. We see two elements there. So we want to have two elements in the markup.


# 2 &nbsp; `align`

## 2.1 &nbsp;*Example:* Aligning children

Let's say you're trying to vertically align elements one after another in a container. You also want an element to have a top margin of 20px.

#### Without postcss-positioning
```css
.child {
  display: block;
  margin: 20px 0 0 0;
  height: 200px;
}
```
#### With postcss-positioning
```css
.child {
  horizontal: 0 1s 0;
  vertical: 20px 200px 0 align;
}
```

Notice how the fact that the element's width takes up the whole space is explicit. Also note that this is a pretty simple example, where vanilla CSS remains pretty much uncluttered. It would be less so if the element also had to be horizontally centered and take up half the space (`horizontal: 1s 2s 1s;`).


## 2.2 &nbsp;The `align` keyword

> "*Fantastic, but what does `align` mean?*"

Until now all elements we positioned were what you may know as absolutely positioned.

Sometimes, you want to position children in a parent without knowing how much children there are or without positioning each one individually.

That's were `align` comes in. It expresses that elements should follow one another, either vertically or horizontally. The space before and space after the element turn into margins, so be careful: [they can cancel out](https://css-tricks.com/what-you-should-know-about-collapsing-margins/).

:warning: When using align, you **can't use stretch** lengths on the axis `align` is used on.



# 3 &nbsp; The `_` Underscore

## 3.1 &nbsp;*Example:* Keeping aspect ratios

When working with images most of the time you don't want to specify both width and height. You can skip a width or height with an underscore
```css
img {
    horizontal: 0 1s 0;
    vertical: 10px _ 1s;
}
```

> *Note*: You still have to specify at least one stretch length

## 3.2 &nbsp;*Example:* Matching content

Let's suppose you are styling paragraphs in a container. You'll do something like:
```css
.container > p {
    horizontal: 10px 1s 10px;
    vertical: 10px 100px 10px align 5px;
}
```

But wait, `100px` would give those paragraphs a fixed height. You want those paragraphs to be as long as the text they contain. Simply do:
```css
.container > p {
    horizontal: 10px 1s 10px;
    vertical: 10px _ 10px align 5px;
}
```

## 3.3 &nbsp;The `_` keyword

An underscore `_` expresses that a height or width should depend on the content. It is useful for working with images or paragraphs.


# 4 &nbsp; Getting Started

## 4.1 &nbsp;Installation
```bash
npm install postcss-positioning --save-dev
```

## 4.2 &nbsp;Usage
```js
postcss = require('postcss')
positioning = require('postcss-positioning')

postcss([
    positioning({
        strict: true,
        dev: false
    })
])
```
See [PostCSS] docs for examples for your environment.

## 4.3 &nbsp;Options

#### `strict`

Warn when using properties that may interfere with PostCSS-Positioning like `width` and `height`.

Error when using `align` without a offset

#### `dev`

Visualize how all elements are positioned on the page. Great for debugging or showcasing your work.

# 5 &nbsp; Community

## 5.1 &nbsp;Questions? Feedback?

  - Check the [wiki][wiki]
  - Search existing [issues][issues]
  - Open an issue
  - [Contact me][contact]

[wiki]: https://github.com/matthias-t/postcss-positioning/wiki
[issues]: https://github.com/matthias-t/postcss-positioning/issues
[contact]: mailto:matthias@totschnig.org

## 5.2 &nbsp;Acknowledgements

An important part of this project is inspired by Kevin Lynagh's [talk][talk] at Deconstruct 2017. This plugin wouldn't exist without it.

Thanks a lot to all contributors who helped improving this plugin.

[talk]: https://www.deconstructconf.com/2017/kevin-lynagh-choosing-features

## 5.3 &nbsp;Support Postcss-Positioning

If this plugin is useful to you, please consider supporting its development.

[![Buy me a Coffee][coffee-img]][coffee]

[coffee-img]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
