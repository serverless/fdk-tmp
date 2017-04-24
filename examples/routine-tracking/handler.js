import fdk, { put } from '@serverless/fdk'
import Analytics from 'analytics-node'
import tracking from './tracking'

const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

// tracking routine. One simple place to manage what events you want to track
const trackables = [
  USER_LOGGED_IN,
  USER_LOGGED_OUT
]
tracking('YOUR_WRITE_KEY', trackables)

const auth = fdk()
  .handler(function*(event) {
    if (event.type === 'http') {
      switch (event.data.path) {
        case '/login':
          yield doLogin()
          yield put({ type: USER_LOGGED_IN})
          break
        case '/logout':
          yield doLogout()
          yield put({ type: USER_LOGGED_OUT})
          break
      }
    }
  })

export auth
