const { set } = require('mudash')
const { use } = require('../../')

const middleware = use(
  (next) => {
    console.log('middleware 1 layer 1 called - next:', next)
    return (event, context) => {
      console.log('middleware 1 layer 2 called - event:', event, ' context:', context)
      event = set(event, 'mid1', true)
      return next(event, context)
    }
  },
  (next) => {
    console.log('middleware 2 layer 1 called - next:', next)
    return async (event, context) => {
      console.log('middleware 2 layer 2 called - event:', event, ' context:', context)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(next(event))
        }, 1000)
      })
    }
  },
  (next) => {
    console.log('middleware 3 layer 1 called - next:', next)
    return function* (event, context) {
      console.log('middleware 3 layer 2 called - event:', event, ' context:', context)
      return yield next(event)
    }
  },
  (event, context, next) => {
    console.log('middleware 4 called - event:', event, ' context:', context, ' next:', next)
    return next(event)
  },
  (event, context, next) => {
    console.log('middleware 4 called - event:', event, ' context:', context, ' next:', next)
    return next(event)
  },
  
)

const fn = middleware((event, context) => {
  console.log('final handler called - event:', event, ' context:', context)
  return {
    response: 'hello'
  }
})

console.log('fn:', fn)

fn({ foo: 'bar' }, { bim: 'bop'})
  .then((result) => console.log(result))
