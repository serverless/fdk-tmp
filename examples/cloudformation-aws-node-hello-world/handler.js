import fdk from '../../'

// exports.myHandler = function(event, context, callback) {
//    ...
//
//    // Use callback() and return information to the caller.
// }

// all three layers are optional
const myHandler = fdk()
console.log('myHandler:', myHandler)
myHandler
  .use(context => {

  })
  .use(context => next => {

  })
  .use(context => next => event => {

  })
