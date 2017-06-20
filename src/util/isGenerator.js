export default function isGenerator(value) {
  return !!value && typeof value.next === 'function' && typeof value.throw === 'function'
}
