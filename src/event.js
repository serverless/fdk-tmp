import { Event } from './types'

/**
 * @eventId	A unique ID for the event.	String
timestamp	The date/time this event was created.	String (ISO 8601)
eventType	The type of the event.	String
resource	The resource that emitted the event.	String
data	The event data.	Object
*/

export default function event({ data, eventId, eventType, native, resource, timestamp }) {
  return new Event({
    data,
    eventId ,
    eventType,
    native,
    resource,
    timestamp
  })
}
