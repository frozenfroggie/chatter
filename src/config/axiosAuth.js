import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://chatter-server.herokuapp.com'
})

try {
  const accessToken = window.sessionStorage.getItem('accessToken')
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
} catch (err) {
  console.log(err)
}

const authorizeInterceptor = instance.interceptors.response.use(res => {
  console.log('interceptor', res)
  return res
}, err => {
  const originalRequest = err.config
  if (err.response.status === 401) {
    const refreshToken = window.localStorage.getItem('refreshToken')
    return instance.post('/user/refreshTokens', {refreshToken})
      .then(res => {
        console.log('refresh!')
        const accessToken = res.headers.authorization.split(' ')[1]
        const refreshToken = res.data.refreshToken
        window.sessionStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('refreshToken', refreshToken)
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken
        return axios(originalRequest)
      })
      .catch(error => {
        instance.interceptors.response.eject(authorizeInterceptor)
        return Promise.reject(error)
      })
  }
})

export default instance
