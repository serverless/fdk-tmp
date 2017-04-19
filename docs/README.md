# Implementation

* [Concepts](#concepts)
  + [Application](#application)
  + [Handlers](#handlers)
    + [Universal Handler](#universal-handler)
    + [Lambda Handler](#lambda-handler)
    + [Azure Handler](#azure-handler)
    + [OpenWhisk Handler](#openwhisk-handler)
    + [Google Handler](#google-handler)
  + [Middleware](#middleware)
  + [Service Reference](#serverless-service-reference)
  + [Function Reference](#serverless-function-reference)
  + [Event Format](#serverless-event-format)


## Concepts

### Application

The serverless fdk provides a simple and extensible framework for building serverless applications.

```js
import fdk from '@serverless/fdk'
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
import fdk from '@serverless/fdk'

const myHandler = fdk()
  .handler(() => "Hello World")

export myHandler
```

#### Lambda Handler

Used to convert existing lambda functions without having to rewrite them. This allows for an easier way of transferring a lambda function to another provider (such as Azure) with minimal rewrite.

```js
// index.js
import fdk from '@serverless/fdk'

const existingCode = (context, event, callback) => callback(null, "Hello World")

const myHandler = fdk()
  .lambda(existingCode)

export myHandler
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
import fdk from '@serverless/fdk'

const app = fdk()
  .use(context => {

  })
  .use(context => next => {

  })
  .use(context => next => event => {

  })
```

```js
import fdk from '@serverless/fdk'

const logger = context => next => async event => {
  console.info('handling', event)
  let result = await next(event)
  console.log('next state', context.getState())
  return result
}

const myHandler = fdk()
  .use(logger)
  .handler((event) => "My response")

export myHandler  
```

### Immutable by Default

```js
import fdk from '@serverless/fdk'

const app = fdk()
  .use(context => next => {
    // some shared middleware
  })

export const handler1 = app.handler(() => console.log('Handler 1'))
export const handler2 = app.handler(() => console.log('Handler 2'))
```

### Types of functions

#### Standard Function
```js
import fdk from '@serverless/fdk'

const app = fdk()
  .use(context => next => event => {
    return next(event)
  })
```

#### Async Function
```js
import fdk from '@serverless/fdk'

const app = fdk()
  .use(context => next => async event => {
    return await next(event)
  })
```

#### Generator Function
```js
import fdk, { take } from '@serverless/fdk'

const app = fdk()
  .use(context => next => function* (event) {
    const pingEvent = yield take('ping')
    return yield next(event)
  })
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
import { service } from '@serverless/fdk'

// Dynamic import of service
const shop = await service('shop')

shop.orderGadget({ type: "flibgibit" }, { name: 'brian' }) // Returns a Promise that resolves to 123
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
import { service } from '@serverless/fdk'

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
