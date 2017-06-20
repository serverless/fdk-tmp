import getTag from './getTag'

const hasOwn = Object.prototype.hasOwnProperty

const isPlainObject = (obj) => {
  if (!obj || getTag(obj) !== '[object Object]') {
    return false
  }

  const hasOwnConstructor = hasOwn.call(obj, 'constructor')
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key
  for (key in obj) { /**/ }

  return typeof key === 'undefined' || hasOwn.call(obj, key)
}

export default isPlainObject
