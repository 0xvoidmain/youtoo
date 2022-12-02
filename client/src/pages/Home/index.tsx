import React from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, CardActions, CardContent, Tab, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

// @ts-ignore
import Button from '~/components/Button'

import AvailalbeChallenges from './AvailableChallenges'

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.textPrimary.main,
  fontSize: '16px',
  textTransform: 'none',
}))

export const HOME_ROUTE = '/'

const Home = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <TabContext value={value}>
        <Box display="flex" justifyContent="space-between">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <StyledTab label="Availalbe Challenges" value="1" />
            <StyledTab label="My Challenges" value="2" />
          </TabList>
          <Button variant="contained">Add challenges</Button>
        </Box>
        <TabPanel value="1">
          <AvailalbeChallenges />
        </TabPanel>
        <TabPanel value="2">
          <Typography>Item two</Typography>
        </TabPanel>
        <TabPanel value="3">
          <Typography>Item three</Typography>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Home
