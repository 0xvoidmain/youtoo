import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Card, CardActions, CardContent, Stack, Typography } from '@mui/material'

import Button from '~/components/Button'
import TextField from '~/components/TextField'
import { useAppDispatch } from '~/state'
import { selectBinanceInfo, setBinanceKey } from '~/state/reducers/app'

const AccountSetting = () => {
  const { apiKey: storeApiKey, apiSecret: storeApiSecret } = useSelector(selectBinanceInfo)
  const [apiKey, setApiKey] = useState<string>(storeApiKey)
  const [apiSecret, setApiSecret] = useState<string>(storeApiSecret)
  const dispatch = useAppDispatch()

  const onChangeApiKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value)
  }

  const onChangeApiSecret = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiSecret(event.target.value)
  }

  const onHandleSaveKey = () => {
    dispatch(
      setBinanceKey({
        apiKey,
        apiSecret,
      }),
    )
    setApiKey('')
    setApiSecret('')
  }

  return (
    <Card
      sx={{
        backgroundColor: 'secondary.dark',
        padding: (theme) => theme.spacing(1),
        margin: (theme) => theme.spacing(0, 0, 4, 0),
      }}
    >
      <CardContent>
        <Typography variant="h3" mb={1}>
          Binance API
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: (theme) => theme.spacing(0.5),
            fontSize: '10px',
            fontStyle: 'italic',
            color: 'red',
          }}
        >
          (*) We need your Binance API key to handle some of your challenge confirmation
        </Typography>
        <Stack
          component="form"
          spacing={2}
          sx={{
            width: '50%',
          }}
        >
          <TextField type="password" label="API Key" variant="outlined" value={apiKey} onChange={onChangeApiKey} />
          <TextField
            type="password"
            label="API Secret"
            variant="outlined"
            value={apiSecret}
            onChange={onChangeApiSecret}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" disabled={!apiKey || !apiSecret} onClick={onHandleSaveKey}>
          Save
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountSetting
