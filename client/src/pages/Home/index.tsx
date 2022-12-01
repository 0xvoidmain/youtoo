import React from 'react'
import Button from 'components/Button'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, CardActions, CardContent, Tab, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.textPrimary.main,
  fontSize: '16px',
}))

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
            <StyledTab label="Item Two" value="2" />
            <StyledTab label="Item Three" value="3" />
          </TabList>
          <Button variant="contained">Add challenges</Button>
        </Box>
        <TabPanel value="1">
          <Card
            sx={{
              backgroundColor: 'secondary.dark',
              padding: (theme) => theme.spacing(1),
              margin: (theme) => theme.spacing(0, 0, 4, 0),
            }}
          >
            <CardContent>
              <Typography gutterBottom fontSize="18px">
                Word of the Day
              </Typography>
              <Typography sx={{ mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained">Details</Button>
            </CardActions>
          </Card>
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
