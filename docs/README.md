# Implementation

* [Application](#application)
* [Handlers](#handlers)
  + [Universal Handler](#universal-handler)
  + [Lambda Handler](#lambda-handler)
  + [Azure Handler](#azure-handler)
  + [OpenWhisk Handler](#openwhisk-handler)
  + [Google Handler](#google-handler)
* [Middleware](#middleware)
* [Context](#context)
* [Event](#event)
* [Service Reference](#serverless-service-reference)
* [Function Reference](#serverless-function-reference)
* [Event Format](#serverless-event-format)
* [Concepts](#concepts)
  + [Consistent](#consistent)
  + [Immutable](#immutable)
  + [Async](#async)
  + [Functional](#functional)
  + [Extendable](#extendable)


## Application

The serverless fdk provides a simple and extensible framework for building serverless applications.

```js
const fdk = require('@serverless/fdk')
const app = fdk()
```


#### `fdk(config)`

```js
fdk(
  config: Object
): FDK
```

Specifying middleware and handler ahead of time (integration point for serverless framework)
```js
fdk({
  middleware: [
    () => {}
  ],
  handler: require('handler.js')
})
```

### Handlers

A handler is an entry point of your serverless application and should be exported as such.


#### Universal Handler

The universal handler

```yaml
# serverless.yml

service:
  name: my-service

functions:
  myHandler:
    handler: index.myHandler
```

```js
// index.js
const fdk = require('@serverless/fdk')

const myHandler = fdk()
  .handler(() => "Hello World")

module.exports.myHandler = myHandler
```

#### `FDK.handler(fn)`

**Signature**
```js
handler(
  fn: (
    event: Event,
    context: Context
  ) => any | Promise | Generator
): (...args:any) => Promise
```

**Example**
```js
fdk()
  .handler((event, context) => {
    return Promise.resolve('some value')
  })
```



#### Lambda Handler

Used to convert existing lambda functions without having to rewrite them. This allows for an easier way of transferring a lambda function to another provider (such as Azure) with minimal rewrite.

```js
// index.js
const fdk = require('@serverless/fdk')

const existingCode = (context, event, callback) => callback(null, "Hello World")

const myHandler = fdk()
  .lambda(existingCode)

module.exports.myHandler = myHandler
```

#### Azure Handler
TODO

#### OpenWhisk Handler
TODO

#### Google Handler
TODO


### Middleware

Middleware functions are functions that have access to the `context` object, `event` object and `next` function in the [serverless event lifecycle](#serverless-event-lifecycle). The next function is a function which, when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:
- Execute code.
- Make changes to the `context` and the `event` objects.
- Call the next middleware in the stack.

Middleware functions can be:
- a plain function
- asynchronous by simply returning a Promise
- a generator function

```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => {
    return context
  })
  .use(context => next => {
    return (event) => next(event)
  })
  .use(context => next => event => {
    return event
  })
```

```js
const fdk = require('@serverless/fdk')

const logger = context => next => async event => {
  console.info('handling', event)
  let result = await next(event)
  return result
}

const myHandler = fdk()
  .use(logger)
  .handler((event) => "My response")

module.exports.myHandler = myHandler
```

### Types of functions

#### Standard Function
```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => next => event => {
    return next(event)
  })
```

#### Async Function

**ES6**
```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => next => async event => {
    return await next(event)
  })
```

**ES5**
```js
var fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => next => async event => {
    return await next(event)
  })
```

#### Generator Function
```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => next => function* (event) {
    return yield next(event)
  })
```

### Context

The Context contains data about the runtime, provider, and other useful information.

```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => {
    console.log(context)
    return context
  })
```

#### Context - Properties

Name | Type | Description
--- | --- | ---
`native` | <code>{Object}</code> | The native provider context.
`provider` | <code>{Object}</code> | The details about the provider.


#### `Context.get(key)`

Used to get a property from the context.

**Signature**
```js
context.get(
  key: string
): any
```

**Example**
```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => {
    console.log(context.get('myCustomKey'))
    return context
  })
```


#### `Context.set(key, value)`

Used to set a value on the Context. This call is *immutable* so it returns a new Context and does not modify the existing one.

**Signature**
```js
context.set(
  key: string,
  value: any
): Context
```

**Example**
```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => {
    const newContext = context.set('myCustomKey', 123)

    console.log(context)    // Context {
                            //  "middleware": List [],
                            //  "native": [object Object],
                            //  "options": [object Object],
                            //  "provider": [object Object]
                            // }
    console.log(newContext) // Context {
                            //  "middleware": List [],
                            //  "native": [object Object],
                            //  "options": [object Object],
                            //  "provider": [object Object],
                            //  "myCustomKey": 123
                            // }

    return newContext
  })
```


### Event
//TODO
```js
```


### Serverless Event Lifecycle

TODO


### Serverless Service Reference

A runtime reference to a Serverless Service that provides a local object representation of the remote service (RPC)

```yaml
service:
  name: shop
  version: 1.0.0

functions:
  orderGadget:
    handler: index.orderGadget
```

```js
// index.js
export function orderGadget(gadget, user) {
  console.log(gadget)  // { type: "flibgibit" }
  console.log(user)    // { name: "brian" }
  return 123
}
```

```js
// any-file.js
const fdk = require('@serverless/fdk')

// Dynamic import of service
fdk.service('shop')
  .then((shop) => {
    shop.orderGadget({ type: "flibgibit" }, { name: 'brian' }) // Returns a Promise that resolves to 123
  })
```


### Serverless Function Reference

A reference to a *Serverless Function* that can be executed at runtime within the body of another *Serverless Function*.

Should provide an interface for remote procedure calls to other services. https://en.wikipedia.org/wiki/Remote_procedure_call

```yaml
service:
  name: shop
  version: 1.0.0

functions:
  orderGadget:
    handler: index.orderWidget
```

```js
// index.js
export function orderGadget(gadget, user) {
  console.log(gadget)  // { type: "flibgibit" }
  console.log(user)    // { name: "brian" }
  return 123
}
```

```js
// index1.js
const fdk = require('@serverless/fdk')

const shop = service('shop')

const orderGadget = shop.orderGadget
orderGadget({ type: "flibgibit" }, { name: 'brian' }) // Returns a Promise that resolves to 123)

```


### Serverless Event Format

* All events share a simple format (this can be enhanced where needed)

```js
{
  createdAt: number,
  receivedAt: number,
  payload: any,
  type: string,
  version: string,      // maybe useful for changes in event payload
  generatedBy: string   //(maybe some kind of key for the event generator?)
}
```

## Concepts

### Consistent

### Immutable

All data models and methods are immutable by default built on top of [immutable](https://facebook.github.io/immutable-js/)

```js
const fdk = require('@serverless/fdk')

const app = fdk()
  .use(context => next => event => {
    // some shared middleware
  })

const handler1 = app.handler(() => console.log('Handler 1'))
const handler2 = app.handler(() => console.log('Handler 2')) // Does not overlap with Handler 1
```

### Async

All functions are designed to handle asynchronous calls with built in support for Promises and Generators.


### Functional

### Extendable
