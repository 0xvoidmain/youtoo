import React, { createContext, ReactNode, useState } from 'react'

import { Alert, AlertColor, Fade, Snackbar, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
interface IAlertContextProvider {
  children: ReactNode
}

interface IAlertContext {
  open: boolean
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>
    }
  >
  onClose: () => void
  onOpenAlert: (severity: AlertColor, message: string) => void
  severity: string
  message: string
}

const initialValue = {
  open: false,
  Transition: Fade,
  onClose: () => {},
  onOpenAlert: (severity: AlertColor, message: string) => {},
  severity: '',
  message: '',
}
// error info success warning
export const AlertContext = createContext<IAlertContext>(initialValue)

export const AlertContextProvider = ({ children }: IAlertContextProvider) => {
  const [notiState, setNotiState] = useState<{
    open: boolean
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>
      }
    >
    severity: AlertColor
    message: string
  }>({
    open: false,
    Transition: Fade,
    severity: 'success',
    message: '',
  })

  const handleClose = () => {
    setNotiState({
      ...notiState,
      open: false,
    })
  }

  const onOpenAlert = (severity: AlertColor, message: string) => {
    setNotiState({
      ...notiState,
      open: true,
      severity,
      message,
    })
  }

  return (
    <AlertContext.Provider
      value={{
        open: notiState.open,
        Transition: notiState.Transition,
        onClose: handleClose,
        onOpenAlert,
        severity: '',
        message: '',
      }}
    >
      {children}
      <Snackbar
        open={notiState.open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={1500}
        TransitionComponent={notiState.Transition}
        key={notiState.Transition.name}
      >
        <Alert onClose={handleClose} severity={notiState.severity} sx={{ width: '100%' }}>
          <Typography
            sx={{
              color: 'black',
            }}
            variant="caption"
          >
            {notiState.message}
          </Typography>
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  )
}
