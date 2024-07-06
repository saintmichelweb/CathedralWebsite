import axios from 'axios'
import Cookies from 'universal-cookie'

const logOutFn = () => {
  const cookies = new Cookies()
  cookies.remove('token')
  window.location.replace('/login')
  return
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.request.use(config => {
  const cookies = new Cookies()
  const cookiesToken = cookies.get('token')

  if (config.url === '/users/login') return config

  if (cookiesToken) {
    config.headers.Authorization = `Bearer ${cookiesToken}`
  }

  if (config.url?.startsWith('/users/reset-password')) {
    const searchParams = new URLSearchParams(location.search)
    if (cookiesToken) {
      config.headers.Authorization = `Bearer ${cookiesToken}`
    } else {
      const token = searchParams.get('token')
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

instance.interceptors.response.use(
  response => response,
  error => {
    console.log('error api', error)
    if (error.response.status === 401) {
      if (window.location.pathname !== '/set-password') {
        logOutFn()
      }
    }
    return Promise.reject(error)
  }
)

export default instance
