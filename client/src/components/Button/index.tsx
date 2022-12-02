import React, { ReactNode } from 'react'

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { styled } from '@mui/system'

interface IButton extends MuiButtonProps {
  children?: ReactNode
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.common.white,
})) as typeof MuiButton

const Button = ({ children, ...props }: IButton) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
