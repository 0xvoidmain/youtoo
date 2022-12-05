import React from 'react'

import { LinearProgress, LinearProgressProps } from '@mui/material'

interface IProgress extends LinearProgressProps {}

const Progress = ({ ...props }: IProgress) => {
  return <LinearProgress {...props} />
}

export default Progress
