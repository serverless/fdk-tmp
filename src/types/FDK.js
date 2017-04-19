import _, { deftype, push, set, update, types } from 'mudash'
import ufs from '../ufs'

const FDK = deftype('FDK', {

  handler: types.Function,
  middleware: types.List,
  options: types.Object,

  handler(fn, obj) {
    const app = set(obj, 'handler', fn)
    console.log('handler - app:', app)
    return ufs(() => {})
  },

  azure(fn, obj) {

  },

  lambda(fn, obj) {

  },

  openwhisk(fn, obj) {

  },

  use(fn, obj) {
    return update(obj, 'middleware', (middleware) => push(middleware, fn))
  }
})

export default FDK
