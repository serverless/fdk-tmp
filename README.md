fdk
=============

The [Serverless](https://serverless.com) Function Development Kit (FDK)

The Serverless FDK is designed to ease the adoption of serverless technology. It provides a simple middleware abstraction for adding functionality and migrating existing solutions (like Express) without having to rewrite your code. It further enables runtime interaction with Serverless Services including invoking functions and dispatching events to the target Service.


## Benefits
- *Works with any deployment tool (including non-Serverless Framework tools):*
  - Example written for using it with the Serverless Framework
  - Example written for using it with SAM
  - Example written for using it with CloudFormation
  - Example written for using it with Terraform
- *Offers convenience and standardization:*
  - Built on immutability
  - Data transformations
  - Uniform experience across FaaS providers
    - Consistent error handling
    - Consistent logging
  - Overall easy service integration (e.g., Loggly, New Relic)
  - Create standard templates for functions.
- *Ties into our platform:*
  - Methods for service discovery and communication
  - Provide a method for establishing a runtime representation of a service instance
  - Provide a runtime based implementation of a Serverless Function
  - Initiate calls between Serverless Functions by piping them over the Serverless Gateway
  - Provide a method for emitting Events to Serverless Services
  - Allow data types to cross between Services (which could be written in any number of languages) and offer basic conversion defaults.


## Build Status
[![npm version](https://badge.fury.io/js/%40serverless%2Ffdk.svg)](https://badge.fury.io/js/%40serverless%2Ffdk)<br />
[![Build Status](https://travis-ci.org/serverless/fdk.svg)](https://travis-ci.org/serverless/fdk)<br />
[![NPM](https://nodei.co/npm/@serverless/fdk.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@serverless/fdk/)


## Usage

```js
// index.js
import fdk from '@serverless/fdk'

const myHandler = fdk()
  .handler(() => "Hello World")

export myHandler
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


## Install

```js
npm install --save @serverless/fdk
```
