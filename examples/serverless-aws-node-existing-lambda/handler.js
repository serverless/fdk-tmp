const fdk = require('@serverless/fdk')

const existingLambda = (context, event, callback) => {
  console.log(context)
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!',
      input: event
    })
  })
}

const hello = fdk()
  .use((context) => (next) => (event) => {
    console.log('hello middleware!')
    console.log('context:', context)
    return event
  })
  .lambda(existingLambda)

module.exports.hello = hello
