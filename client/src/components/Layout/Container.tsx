import React, { ReactNode } from 'react'

import { Box, CircularProgress, Stack } from '@mui/material'

interface IContainer {
  children: ReactNode
  isLoading?: boolean
}

const Container = ({ children, isLoading }: IContainer) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}

export default Container
