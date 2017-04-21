const fdk = require('@serverless/fdk')
const Analytics = require('analytics-node')

const analytics = new Analytics('YOUR_WRITE_KEY')

const eventRecorder = (context) => (next) => (event) => {

  analytics.identify({
    userId: event.data.userId,
    traits: event.data.traits
  })

  return next(event)
    .then((result) => {
      if (event.type === 'http' && event.data.path === '/login') {
        analytics.track({
          userId: event.data.userId,
          event: 'Login Attempt',
          properties: {
            timestamp: Date.now()
          }
        })
      }
      return result
    })
}

const hello = fdk()
  .use(crashReporter)
  .handler((event) => 'Hello world!')

module.exports.hello = hello
