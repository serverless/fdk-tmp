import request from './util/request'

// TODO BRN: Make this configurable
const API = 'https://api.serverless.com'

/**
 * @param {string} name
 * @param {any} data
 * @param {Object} options
 * @returns {Promise}
 */
export default function invoke(name, data, options) {
  return request.post(`${API}/invoke`, {
    body: {
      options,
      data
    },
    json: true
  })
}
