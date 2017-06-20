import Context from './types/Context'
import provider from './provider'

export default function context({ middleware = [], native, options }) {
  return new Context({
    middleware,
    native,
    options,
    provider: provider(native)
  })
}
