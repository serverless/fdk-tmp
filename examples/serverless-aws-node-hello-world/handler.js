const fdk = require('@serverless/fdk')

const hello = fdk()
  .use((context) => (next) => (event) => {
    console.log('hello middleware!')
    console.log('context:', context)
    return event
  })
  .handler((event) => {
    console.log('hello handler!')
    console.log('event:', event)
    return  {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello world!',
        input: event
      })
    }
  })

module.exports.hello = hello
