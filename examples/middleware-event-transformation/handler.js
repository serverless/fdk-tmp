const fdk = require('@serverless/fdk')

const eventTransform = (context) => (next) => (event) => {
  event = event.set('foo', 123)
  return next(event)
}

const hello = fdk()
  .use(eventTransform)
  .handler((event) => 'Hello world!')

module.exports.hello = hello
