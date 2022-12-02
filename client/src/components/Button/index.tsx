import React, { ReactNode } from 'react'

import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material'
import { styled, SxProps } from '@mui/material/styles'
import { Theme } from '@mui/system'

interface IButton extends MuiButtonProps {
  children?: ReactNode
  isLoading?: boolean
  disabled?: boolean
  sx?: SxProps<Theme>
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.common.white,
  '&.Mui-disabled': {
    color: '#ffffff2b',
    backgroundColor: '#4a4953',
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
})) as typeof MuiButton

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '&': {
    marginLeft: 8,
  },
}))

const Button = ({ children, isLoading = false, disabled = false, sx = {}, ...props }: IButton) => {
  return (
    <StyledButton disabled={disabled || isLoading} sx={sx} {...props}>
      {children}
      {isLoading && <StyledCircularProgress size={15} color="inherit" />}
    </StyledButton>
  )
}

export default Button
