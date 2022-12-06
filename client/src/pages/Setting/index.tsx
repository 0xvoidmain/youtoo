import React from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Stack, Tab, Typography } from '@mui/material'
import { styled } from '@mui/system'

import Button from '~/components/Button'

import AccountSetting from './AccountSetting'
export const SETTING_ROUTE = '/setting'

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.textPrimary.main,
  fontSize: '16px',
  textTransform: 'none',
}))

const Setting = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <TabContext value={value}>
        <Stack direction="row" justifyContent="space-between">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <StyledTab label="Account setting" value="1" />
          </TabList>
        </Stack>
        <TabPanel value="1">
          <Typography variant="h3">
            <AccountSetting />
          </Typography>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Setting
