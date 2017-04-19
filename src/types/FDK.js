import { deftype, flow, isFunction, map, push, set, update, types } from 'mudash'
import ufs from '../ufs'
import use from '../use'

const FDK = deftype('FDK', {

  handle: types.Function,
  middleware: types.List,
  options: types.Object,

  handler(fn, obj) {
    const app = set(obj, 'handle', fn)
    return ufs(async (context, event) => {
      const wrapped = map(app.middleware, (middleware) => (ctx) => {
        const result = middleware(ctx)
        return isFunction(result) ? ctx.use(result) : result
      })
      context = await flow(wrapped)(context)
      event = await use(...context.middleware)(event)
      return await app.handle(event)
    })
  },

  // azure(fn, obj) {
  //
  // },
  //
  // lambda(fn, obj) {
  //
  // },
  //
  // openwhisk(fn, obj) {
  //
  // },

  use(fn, obj) {
    return update(obj, 'middleware', (middleware) => push(middleware, fn))
  }
})

export default FDK
