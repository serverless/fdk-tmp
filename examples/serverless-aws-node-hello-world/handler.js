const fdk = require('@serverless/fdk')

const hello = fdk()
  .use((context) => (next) => (event) => {
    console.log('hello context!:', context)
    return event
  })
  .handler((event) => {
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
