import { im } from 'mudash'
import { Context } from './types'
import provider from './provider'

export default function context({ middleware = im([]), native, options }) {
  return Context({
    middleware,
    native,
    options,
    provider: provider(native)
  })
}
