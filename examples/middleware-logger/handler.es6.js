// Logging ES6 Example

import fdk from '@serverless/fdk'

const logger = (context) => (next) => async (event) => {
  console.info('handling event:', event)
  const result = await next(event)
  console.info('event complete:', event)
  return result
}
const hello = fdk()
  .use(logger)
  .handler((event) => 'Hello world!')

export hello
