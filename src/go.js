import { isFunction, satisfies } from 'mudash'
import { Goable } from './protocols'
import { Routine } from './types'

const go = async (args, goable) => {
  if (!satisfies(Goable, goable) && !isFunction(goable)) {
    throw new Error('Expected Goable value or function')
  }
  return await Routine({ goable }).go(args)
}
export default go
