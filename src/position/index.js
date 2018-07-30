// Bundles the position class

import Position from './position'
import parse from './parse'
import stretch from './stretch'
import validate from './validate'
import strip from './strip'

Position.parse = parse
Position.prototype.stretch = stretch
Position.prototype.validate = validate
Position.prototype.strip = strip

export default Position
