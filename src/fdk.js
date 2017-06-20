import FDK from './types/FDK'
import ufs from './ufs'

export default function fdk(middleware) {
  const fdk = new FDK({
    middleware
  })
  return (handler) => ufs(async (context, event) => {
    context = await flow(obj.middleware)(context)
    const handler = await use(...context.middleware)((evt) => fn(evt, context))
    return await handler(event, context)
  })
}
