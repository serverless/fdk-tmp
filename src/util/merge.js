import isArray from './isArray'
import isPlainObject from './isPlainObject'

export default function merge(...sources) {
  let target = {}
  let { length } = sources
  for (let i = 0; i < length; ++i) {
    source = sources[i]
    // Only deal with non-null/undefined values
    if (source != null) {
      // Extend the base object
      for (name in source) {
        value = source[name]

        // Prevent never-ending loop
        if (target !== value) {
          // Recurse if we're merging plain objects or arrays
          if (typeof value !== 'undefined') {
            target[name] = value
          }
        }
      }
    }
  }

  return target
}
