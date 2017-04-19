import { deftype, types } from 'mudash'

const Event = deftype('Event', {
  data: types.Object,
  native: types.Object
})

export default Event
