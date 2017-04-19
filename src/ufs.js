import { isString } from './mudash'
import context from './context'
import event from './event'

export default function ufs(fn, options = {}) {
  const ctx = context({
    options
  })
  return createWrapper(fn, ctx)
}

const createWrapper = (fn, ctx) => providerMap[ctx.provider.name](fn, ctx)
const providerMap = {
  'aws': (fn, ctx) => async (evt, nativeContext, callback) => {
    ctx = context({ ...ctx, native: nativeContext })
    evt = event({ native: evt })
    try {
      let response = await call(fn, ctx, evt)
      if (isString(response)) {
        response = {
          statusCode: 200,
          body: response
        }
      }
      callback(null, response)
    } catch(error) {
      callback(error)
    }
  },
  // 'azure': (fn, ctx) => (nativeContext, ...args) => {
  //   // ctx = context({ ...ctx, native })
  //   // return transformArgs(ctx, args)
  //   //   .then((args) => call(ctx, fn, ...args))
  //   //   .then((result) => ctx.done(null, result))
  //   //   .catch((error) => ctx.done(error))
  // },
  // 'google': (fn, ctx) => (evt, callback) => {
  //   // ctx = context({ ...ctx, native })
  //   // return transformArgs(ctx, [evt])
  //   //   .then((args) => call(ctx, fn, ...args))
  //   //   .then((result) => callback(null, result))
  //   //   .catch((error) => callback(error))
  // },
  // 'openwhisk': (fn, ctx) => (params) => {
  //   // ctx = context({ ...ctx, native })
  //   // return transformArgs(ctx, [params])
  //   //   .then((args) => call(ctx, fn, ...args))
  // },
  'default': (fn, ctx) => async (...args) => {
    ctx = context({ ...ctx, native: {} })
    const evt = event({
      data: {
        args
      },
      native: {}
    })
    return await call(fn, ctx, evt)
  }
}

function call(fn, ctx, evt) {
  //TODO BRN: Add domain support https://nodejs.org/dist/latest-v6.x/docs/api/domain.html
  return new Promise((resolve, reject) => {
    try {
      const result = fn(ctx, evt)
      resolve(result)
    } catch(error) {
      reject(error)
    }
  })
}

// function transformArgs(ctx, args) {
//   // const { transforms } = ctx
//   // const eventType = ''// TODO BRN: Figure out how to determine the eventType
//   // const transform = transforms[eventType]
//   // return Promise.all([transform ? transform(...args) : ...args])
// }
