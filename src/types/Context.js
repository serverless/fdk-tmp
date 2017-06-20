
export default class Context {

  constructor({ middleware, native, options, provider }) {
    this.middleware = middleware
    this.native = native
    this.options = options
    this.provider = provider
  }

  use(fn) {
    this.middleware.push(fn)
  }
}
