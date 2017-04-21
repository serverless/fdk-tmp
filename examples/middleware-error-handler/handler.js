// Promise Example

const fdk = require('@serverless/fdk')

const crashReporter = (context) => (next) => (event) => {

  // All calls are async so errors should be caught with a Promise
  return new Promise((resolve, reject) => {
    resolve(next(event))
  }).catch((error) => {
    Raven.captureException(err, {
      extra: {
        event: event,
        context: context
      }
    })
  })
}

const hello = fdk()
  .use(crashReporter)
  .handler((event) => 'Hello world!')

module.exports.hello = hello
