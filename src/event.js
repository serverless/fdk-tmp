import { Event } from './types'

export default function event({ data, native }) {
  return Event({
    data,
    native
  })
}
