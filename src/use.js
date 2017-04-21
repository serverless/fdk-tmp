import { compose, identity, map } from 'mudash'
import go from './go'

export default function use(...fns) {
  const wrapped = map(fns, (fn) => (next) => fn(async (...args) => await go(args, next)))
  const composed = compose(...wrapped)
  return (handler = identity) => composed(handler)
}
