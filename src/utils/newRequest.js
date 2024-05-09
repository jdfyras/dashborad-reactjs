import axios from 'axios'

const newRequest = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true
})

// Use Axios interceptors to attach the token to every request
newRequest.interceptors.request.use(
  config => {
    // Try to get the access token from localStorage or any other storage you use
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default newRequest
