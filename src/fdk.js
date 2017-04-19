import { im } from 'mudash'
import { FDK } from './types'

export default function fdk(config = {}) {
  let { middleware, handler, options } = config
  middleware = middleware || im([])
  handler = handler || null
  options = options || {}
  return FDK({
    middleware,
    handler,
    options
  })
}
