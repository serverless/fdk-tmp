const { ufs } = require('../../')

const fn = ufs((context, event) => {
  console.log('context:', context)
  console.log('event:', event)
  return 'some result'
})

console.log('fn:', fn)
fn('a', 'b', 'c')
  .then((result) => {
    console.log('result:', result)
  })
