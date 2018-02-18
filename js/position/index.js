// Bundles the position class

import Position from './position';
import parse from './parse';
import stretch from './stretch';
import validate from './validate';

Position.parse = parse;
Position.prototype.stretch = stretch;
Position.prototype.validate = validate;

export default Position;
