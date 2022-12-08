import React from 'react'
import { useNavigate } from 'react-router-dom'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Stack, Tab } from '@mui/material'
import { styled } from '@mui/system'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import Button from '~/components/Button'

import { CREATE_CHALLENGE_ROUTE } from '../CreateChallenge'

import AvailalbeChallenges from './AvailableChallenges'
import MyChallenges from './MyChallenges'

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.textPrimary.main,
  fontSize: '16px',
  textTransform: 'none',
}))

export const HOME_ROUTE = '/'

const Home = () => {
  const navigate = useNavigate()
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [value, setValue] = React.useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <TabContext value={value}>
        <Stack direction="row" justifyContent="space-between">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <StyledTab label="Availalbe Challenges" value="1" />
            <StyledTab label="My Challenges" value="2" />
          </TabList>
          <Button
            onClick={() => navigate(CREATE_CHALLENGE_ROUTE)}
            variant="contained"
            sx={{
              lineHeight: 'normal',
            }}
          >
            Add challenge
          </Button>
        </Stack>
        <TabPanel value="1">
          <AvailalbeChallenges />
        </TabPanel>
        <TabPanel value="2">
          <MyChallenges />
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Home
