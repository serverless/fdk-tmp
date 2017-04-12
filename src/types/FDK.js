import _, { deftype, push, set, update, types } from 'mudash'
console.log('types:', types)

const FDK = deftype('FDK', {

  handler: types.Function,
  middleware: types.List,
  options: types.Object,

  handler(fn, obj) {
    const app = set(obj, 'handler', fn)
    return ufs()
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


function ufs(fn, options) {
  const context = {
    options,
    provider: getProvider()
  }
  return createWrapper(method, context)
}

const createWrapper = (method, context) => providerMap[context.provider](method, context)
const providerMap = {
  'aws': (method, context) => (event, _context, callback) => {
    context = generateContext(context, _context)
    return transformArgs(context, [event])
      .then((args) => call(context, method, ...args))
      .then((result) => callback(null, result))
      .catch((error) => callback(error))
  },
  'azure': (method, context) => (_context, ...args) => {
    context = generateContext(context, _context)
    return transformArgs(context, args)
      .then((args) => call(context, method, ...args))
      .then((result) => context.done(null, result))
      .catch((error) => context.done(error))
  },
  'google': (method, context) => (event, callback) => {
    context = generateContext(context)
    return transformArgs(context, [event])
      .then((args) => call(context, method, ...args))
      .then((result) => callback(null, result))
      .catch((error) => callback(error))
  },
  'openwhisk': (method, context) => (params) => {
    context = generateContext(context)
    return transformArgs(context, [params])
      .then((args) => call(context, method, ...args))
  },
  'default': (method, context) => (...args) => {
    context = generateContext(context)
    return transformArgs(context, args)
      .then((args) => call(context, method, ...args))
  }
}

function call(context, method, ...args) {
  //TODO BRN: Add domain support https://nodejs.org/dist/latest-v6.x/docs/api/domain.html
  return new Promise((resolve, reject) => {
    try {
      const result = method.call({ context }, ...args)
      resolve(result)
    } catch(error) {
      reject(error)
    }
  })
}

function transformArgs(context, args) {
  // const { transforms } = context
  // const eventType = ''// TODO BRN: Figure out how to determine the eventType
  // const transform = transforms[eventType]
  // return Promise.all([transform ? transform(...args) : ...args])
}

function generateContext(...contexts) {
  return _.merge(...contexts)
}

function getProvider() {
  const provider = 'default'
  // figure out if we're in azure, aws, openwhisk, google or default
  return provider
}
