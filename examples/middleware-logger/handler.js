// Logging Example

const fdk = require('@serverless/fdk')

const logger = (context) => (next) => (event) => {
  console.info('handling event:', event)
  return next(event)
    .then((result) => {
      console.info('event complete:', event)
      return result
    })
}
const hello = fdk()
  .use(logger)
  .handler((event) => 'Hello world!')

module.exports.hello = hello
