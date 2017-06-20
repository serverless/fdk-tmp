import getTag from './getTag'

const isArray = (arr) => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr)
  }

  return getTag(arr) === '[object Array]'
}

export default isArray
