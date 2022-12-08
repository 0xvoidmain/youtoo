import React, { useContext } from 'react'

import { AlertContext } from './AlertContext'

const useAlert = () => {
  const { onOpenAlert } = useContext(AlertContext)

  return {
    onOpenAlert,
  }
}

export default useAlert
