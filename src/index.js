import 'babel-polyfill'
import each from './util/each'
import call from './call'
import context from './context'
import event from './event'
import fdk from './fdk'
import go from './go'
import provider from './provider'
import service from './service'
import ufs from './ufs'
import use from './use'

const modules = {
  call,
  context,
  event,
  fdk,
  go,
  provider,
  service,
  ufs,
  use
}

const main = function(...args) {
  return fdk(...args)
}
each(modules, (mod, name) => {
  main[name] = mod
})
module.exports = main
