import React from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/system'

import { ChallengeStatus } from '~/state/reducers/types'
interface IRibbon {
  type: ChallengeStatus
}

const generateRibbonColor = (
  type: ChallengeStatus,
): {
  color1: string
  color2: string
} => {
  switch (type) {
    case 'Joined':
      return {
        color1: '#4caf50d9',
        color2: '#4caf50',
      }
    case 'Ongoing':
      return {
        color1: '#ffac33',
        color2: '#ff9800',
      }
    default:
      return {
        color1: '#2473a7',
        color2: '#3498db',
      }
  }
}

const RibbonWrapper = styled(Box)<IRibbon>(({ theme, type }) => ({
  width: '130px',
  height: '130px',
  top: '-10px',
  right: '-10px',
  overflow: 'hidden',
  position: 'absolute',
  '&:before, &:after': {
    position: 'absolute',
    zIndex: 1,
    content: '""',
    display: 'block',
    border: `5px solid ${generateRibbonColor(type).color1}`,
  },
  '&:before': {
    top: 0,
    left: '10px',
  },
  '&:after': {
    bottom: '11px',
    right: 0,
  },
  '& > span': {
    position: 'absolute',
    display: 'block',
    minWidth: '220px',
    fontSize: '12px',
    fontWeight: 600,
    textAlign: 'center',
    padding: '15px 0',
    backgroundColor: `${generateRibbonColor(type).color2}`,
    boxShadow: '0 5px 10px rgba(0,0,0,.1)',
    color: '#fff',
    textShadow: '0 1px 1px rgba(0,0,0,.2)',
    left: '-24px',
    top: '23px',
    zIndex: 2,
    transform: 'rotate(45deg)',
  },
}))

const Ribbon = ({ type }: IRibbon) => {
  return (
    <RibbonWrapper type={type}>
      <span>{type}</span>
    </RibbonWrapper>
  )
}

export default Ribbon
