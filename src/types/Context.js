import { deftype, push, update, types } from 'mudash'

const Context = deftype('Context', {

  middleware: types.List,
  native: types.Object,
  options: types.Object,
  provider: types.Object,

  use(fn, obj) {
    return update(obj, 'middleware', (middleware) => push(middleware, fn))
  }
})

export default Context
