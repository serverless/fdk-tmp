import { im } from 'mudash'
import { FDK } from './types'

export default function fdk(config = {}) {
  let { middleware, handler, options } = config
  middleware = middleware || im([])
  options = options || {}

  const app = FDK({
    middleware,
    options
  })
  return handler ? app.handler(handler) : app
}
