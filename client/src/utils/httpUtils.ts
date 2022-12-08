import http, { AxiosRequestConfig } from 'axios'

import configs from '~/configurations'
import { IAuth } from '~/state/reducers/types'

import { AUTH_TOKEN, getFromLocalStorage } from './localStorage'

const Http = http.create({
  baseURL: `${configs.apiUrl}`,
})

export const getToken = () => {
  const authInfo = getFromLocalStorage<IAuth>(AUTH_TOKEN)
  if (authInfo) {
    return authInfo.AccessToken
  }

  return null
}

Http.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken()
  const newHeaders = config.headers || {}
  if (token !== null) {
    newHeaders.authorization = `${token}`
  }
  newHeaders['Content-Type'] = 'application/json'
  config.headers = newHeaders
  return config
})

Http.defaults.params = {}

export default Http
