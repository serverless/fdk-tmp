var _ = require('mudash')
var modules = require('./dist')
var fdk = function() {
  return modules.fdk.apply(null, arguments)
}
_.each(modules, function(mod, name) {
  fdk[name] = mod
})
module.exports = fdk
