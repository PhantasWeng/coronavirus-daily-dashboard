import axios from 'axios'

const service = axios.create({
  baseURL: 'https://covidapi.info/api/v1/',
  crossdomain: true
})

// request interceptors
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    if (response && response.status !== 200) {
      console.error(`🚨 [API] ${response.config.url.replace(response.config.baseURL, '')}`, response.data)
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.debug(`👌 [API] ${response.config.url.replace(response.config.baseURL, '')}`, response.data)
      }
    }
    return response.data
  },
  error => {
    console.error('🚨 [API] ' + error)
    return Promise.reject(error)
  })

export default service
