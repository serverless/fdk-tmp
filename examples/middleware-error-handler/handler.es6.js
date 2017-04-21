// ES6 Example
// A simpler way of accomplishing the same thing can be done with async/await.
// However, this requires the use of ES6 transpiler or node 7.6+

import fdk from '@serverless/fdk'

const crashReporter = (context) => (next) => async (event) => {
  try {
    return next(event)
  } catch(error) {
    Raven.captureException(err, {
      extra: {
        event,
        context
      }
    })
  }
}

const hello = fdk()
  .use(crashReporter)
  .handler((event) => 'Hello world!')

export hello
