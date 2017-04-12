import { butLast, deftype, isFunction, isGenerator, last, set, types } from 'mudash'
import Promise from 'bluebird'
import Goable from '../protocols/Goable'

const Routine = deftype('Routine', {

  goable: types.Object,

  async go(args, obj) {
    return await goGoable(obj.goable, args)
  }
})

export default Routine

async function goGoable(goable, args = []) {
  let result
  if (isFunction(goable)) {
    result = goable(...args)
  } else if (Goable.is(goable)) {
    result = goable.go(args)
  }
  return await goResolve(result)
}

async function goValue(value) {
  if (isGenerator(value)) {
    return await goGenerator(value)
  }
  return value
}

async function goResolve(value) {
  value = await Promise.resolve(value)
  return await goValue(value)
}

async function goGenerator(generator) {
  let next = { done: false }
  while (!next.done) {
    next = await goNext(generator, next.value)
  }
  return next.value
}

async function goNext(generator, value) {
  const next = generator.next(value)
  return {
    ...next,
    value: await goResolve(next.value)
  }
}
