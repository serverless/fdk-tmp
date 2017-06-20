import request from './util/request'

// TODO BRN: Make this configurable
const API = 'https://api.serverless.com'

/**
 * @param {Event} event
 * @returns {Promise}
 */
export default function emit(event) {
  return request.post(`${API}/emit`, {
    body: {
      event
    },
    json: true
  })
}
