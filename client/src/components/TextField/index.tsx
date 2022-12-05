import React from 'react'

import { TextField as MuiTextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledMuiTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.common.white,
  },
})) as typeof MuiTextField

// type ITextField = {
//   name: string
// } & TextFieldProps

const TextField = ({ ...props }: TextFieldProps) => {
  return <StyledMuiTextField {...props} />
}

export default TextField
