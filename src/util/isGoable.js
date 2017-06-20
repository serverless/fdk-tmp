import isFunction from './isFunction'

export default function isGoable(value) {
  return !!value && isFunction(value.go)
}
