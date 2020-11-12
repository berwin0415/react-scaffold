import axios from 'axios'
import stroe from 'store'
import { goLogin } from '.'
import { TOKEN } from '../config'

const request = axios.create({
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = stroe.get(TOKEN)
  if (token) {
    config.headers.Authorization = token
  } else {
    goLogin
  }
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    console.log(err)
  }
)
const Ajax = {
  get: (url, params, options) => request.get(url, { params, ...options }),
  post: (url, data, options) => request.post(url, data, options),
}

export default Ajax
