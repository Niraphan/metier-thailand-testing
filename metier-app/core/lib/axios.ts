import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_token="))
      ?.split("=")[1]

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token หมดอายุ → ลบ cookie + redirect login
      document.cookie =
        "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"

      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default axiosInstance