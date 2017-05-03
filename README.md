fdk
=============

The [Serverless](https://serverless.com) Function Development Kit (FDK)

The Serverless FDK is designed to ease the adoption of serverless technology. It provides a simple middleware abstraction for adding functionality and migrating existing solutions (like Express) without having to rewrite your code. It further enables runtime interaction with Serverless Services including invoking functions and dispatching events to the target Service.


## Build Status
[![npm version](https://badge.fury.io/js/%40serverless%2Ffdk.svg)](https://badge.fury.io/js/%40serverless%2Ffdk)<br />
[![Build Status](https://travis-ci.org/serverless/fdk.svg)](https://travis-ci.org/serverless/fdk)<br />
[![NPM](https://nodei.co/npm/@serverless/fdk.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@serverless/fdk/)


## Usage

```js
// index.js
const fdk = require('@serverless/fdk')

const myHandler = fdk()
  .handler(() => 'Hello World')

module.exports.myHandler = myHandler
```

```yaml
# serverless.yml

service:
  name: my-service

functions:
  myHandler:
    handler: index.myHandler
```

## Documentation

[Full API documentation](./docs) - Learn about available methods and concepts.

## Examples

[Plenty of examples](./examples) - Examples for various cloud providers and uses of functionality.

## Install

```js
npm install --save @serverless/fdk
```
