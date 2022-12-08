export const AUTH_TOKEN = 'auth_token'

export const isAvailable = () => {
  return typeof window !== undefined && typeof window.localStorage !== undefined
}

export const getFromLocalStorage = <T>(key: string): T | null => {
  if (!isAvailable()) {
    return null
  }

  const result = window.localStorage.getItem(key)
  try {
    if (result) {
      return JSON.parse(result)
    }

    return null
  } catch (error) {
    return null
  }
}

export const setToLocalStorage = <D>(key: string, value: string | Record<string, any> | number | D) => {
  if (!isAvailable()) {
    return
  }

  if (key && value) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    window.localStorage.setItem(key, value)
  }
}

export const removeFromLocalStorage = (key: string) => {
  if (!isAvailable()) {
    return
  }

  if (key) {
    window.localStorage.removeItem(key)
  }
}
