const { fdk } = require('../../')

const app = fdk()
  .use((context) => {
    console.log('middleware 1 - context:', context)
    return context.set('a', 123)
  })
  .use((context) => {
    console.log('middleware 2 - context:', context)
    return (next) => (event) => {
      console.log('middleware 2 - event:', event)
      event = event.set('b', 234)
      return next(event)
    }
  })

const handler = app.handler((event, context) => {
  console.log('handler - event:', event, ' context:', context)
  return 'Hello world'
})

handler('a', 'b', 'c')
  .then((result) => {
    console.log('result:', result)
  })
