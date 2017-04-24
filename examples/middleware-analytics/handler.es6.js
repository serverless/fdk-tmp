// Example of using Segment to track function invocations

import fdk from '@serverless/fdk'
import Analytics from 'analytics-node'

const analytics = new Analytics('YOUR_WRITE_KEY')

const loginRecorder = (context) => (next) => async (event) => {

  analytics.identify({
    userId: event.data.userId,
    traits: event.data.traits
  })

  const result = await next(event)
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
}

const hello = fdk()
  .use(loginRecorder)
  .handler((event) => 'Hello world!')

export hello
