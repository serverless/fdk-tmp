import { im } from 'mudash'
import { FDK } from './types'

export default function fdk({ middleware = im([]), handler }) {
  return FDK({
    middleware,
    handler
  })
}
