import isFunction from '../util/isFunction'
import isGenerator from '../util/isGenerator'
import isGoable from '../util/isGoable'

export default class Routine {
  constructor({ goable }) {
    this.goable = goable
  }
  async go(args) {
    return await goGoable(this.goable, args)
  }
}

async function goGoable(goable, args = []) {
  let result
  if (isFunction(goable)) {
    result = goable(...args)
  } else if (isGoable(goable)) {
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
