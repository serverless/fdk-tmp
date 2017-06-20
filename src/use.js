import go from './go'

export default function use(...fns) {
  // const wrapped = map(fns, (fn) => (next) => fn(async (...args) => await go(args, next)))
  // const composed = compose(...wrapped)
  // return (handler = identity) => composed(handler)

  
}

// const middleware = (event, context, next) => {
//   return next(event)
// }

// const middleware = (next) => (context) => (event) => {
//   return next(event)
// }
