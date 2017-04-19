import { context } from '../../'

let ctx = context({

})

console.log('ctx:', ctx)
console.log('ctx.provider:', ctx.provider)

// rebuild context
ctx = context({ ...ctx, native: { a: 1 } })

console.log('rebuilt ctx:', ctx)
