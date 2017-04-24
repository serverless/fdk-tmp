import { go, takeEvery } from '@serverless/fdk'
import Analytics from 'analytics-node'

const tracking = (writeKey, trackables) => {
  go(() => takeEvery(trackables, (event) => {
    track(event)
  }))

  const analytics = new Analytics(writeKey)

  function track(event) {
    analytics.track({
      userId: event.data.userId,
      event: event.type,
      properties: {
        timestamp: Date.now()
      }
    })
  }
}
