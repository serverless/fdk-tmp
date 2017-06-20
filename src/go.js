import Routine from './types/Routine'
import isFunction from './util/isFunction'

const go = async (args, goable) => {
  if (!goable || (!isFunction(goable.go) && !isFunction(goable))) {
    throw new Error('Expected Goable value or function')
  }
  return await new Routine({ goable }).go(args)
}
export default go
