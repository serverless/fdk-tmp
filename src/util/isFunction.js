import baseGetTag from './baseGetTag'
import isObject from './isObject'

export default function isFunction(value) {
  if (!isObject(value)) {
    return false
  }
  const tag = baseGetTag(value)
  return tag == '[object Function]' || tag == '[object AsyncFunction]' ||
    tag == '[object GeneratorFunction]' || tag == '[object Proxy]'
}
