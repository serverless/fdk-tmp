import getTag from './getTag'

export default function isString(value) {
  const type = typeof value
  return type == 'string' || (type == 'object' && value != null && !Array.isArray(value) && getTag(value) == '[object String]')
}
