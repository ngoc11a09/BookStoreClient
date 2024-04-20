import { ACCESS_TOKEN } from '@/constants/localStorage'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) return Promise.reject(error.response.data)

      return Promise.reject(error.response.data)
    }
    return Promise.reject('Failed')
  }
)

export default api
