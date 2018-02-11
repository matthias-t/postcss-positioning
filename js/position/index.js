// Bundles the position class

import Position from './position';
import parse from './parse';
import stretch from './stretch';

Position.parse = parse;
Position.prototype.stretch = stretch;

export default Position;
