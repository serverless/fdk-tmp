import { im } from 'mudash'
import { FDK } from './types'

export default function fdk(config = {}) {
  let { middleware = im([]), handler, options } = config
  return FDK({
    middleware,
    handler,
    options
  })
}
