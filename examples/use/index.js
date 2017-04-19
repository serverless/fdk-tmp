const { use } = require('../../')

const fn = use(
  (next) => {
    console.log('middleware 1 layer 1 called - next:', next)
    return (data) => {
      console.log('middleware 1 layer 2 called - data:', data)
      return next(data)
    }
  },
  (next) => {
    console.log('middleware 2 layer 1 called - next:', next)
    return async (data) => {
      console.log('middleware 2 layer 2 called - data:', data)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(next(data))
        }, 1000)
      })
    }
  },
  (next) => {
    console.log('middleware 3 layer 1 called - next:', next)
    return function* (data) {
      console.log('middleware 3 layer 2 called - data:', data)
      return next(data)
    }
  }
)

fn({ foo: 'bar' })
  .then((result) => console.log(result))
