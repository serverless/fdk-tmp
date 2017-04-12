import { compose, identity, map } from 'mudash'
import go from './go'

export default function use(...fns) {
  const wrapped = map(fns, (fn) => (next) => fn(async (data) => await go([data], next)))
  return compose(...wrapped)(identity)
}
