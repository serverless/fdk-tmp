const { set } = require('mudash')
const { use } = require('../../')

const middleware = use(
  (next) => {
    console.log('middleware 1 layer 1 called - next:', next)
    return (data, context) => {
      console.log('middleware 1 layer 2 called - data:', data, ' context:', context)
      data = set(data, 'mid1', true)
      return next(data, context)
    }
  },
  (next) => {
    console.log('middleware 2 layer 1 called - next:', next)
    return async (data, context) => {
      console.log('middleware 2 layer 2 called - data:', data, ' context:', context)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(next(data))
        }, 1000)
      })
    }
  },
  (next) => {
    console.log('middleware 3 layer 1 called - next:', next)
    return function* (data, context) {
      console.log('middleware 3 layer 2 called - data:', data, ' context:', context)
      return yield next(data)
    }
  }
)

const fn = middleware((data, context) => {
  console.log('final handler called - data:', data, ' context:', context)
  return data
})

console.log('fn:', fn)

fn({ foo: 'bar' }, { bim: 'bop'})
  .then((result) => console.log(result))
