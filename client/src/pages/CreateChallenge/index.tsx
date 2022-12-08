import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

import Button from '~/components/Button'
import TextField from '~/components/TextField'
import configs from '~/configurations'
import useAlert from '~/Context/useAlert'
import { createChallegeSchema } from '~/schema/createChallengeSchema'
import Http from '~/utils/httpUtils'

import { ICreateChallenge } from './types'

export const CREATE_CHALLENGE_ROUTE = '/create-challenge'
const CreateChallenge = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onOpenAlert } = useAlert()
  const { control, handleSubmit, formState } = useForm<ICreateChallenge>({
    resolver: yupResolver(createChallegeSchema),
    defaultValues: {
      startAt: new Date().toISOString(),
    },
    reValidateMode: 'onChange',
  })

  const { errors } = formState
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      const { name, description, minDepositAmount, tokenAmount, timeframe, startAt, numberOfTimeFrame } = data

      await Http.post(`/CreateChallenge`, {
        templateId: 1,
        name,
        description,
        type: timeframe,
        token: 'SOL',
        startAt,
        amount: tokenAmount,
        depositAmount: minDepositAmount,
        numberTimeframe: numberOfTimeFrame,
      })
      setIsLoading(false)
      onOpenAlert('success', 'Successfully created challenge')
    } catch (error) {
      setIsLoading(false)
    }
  })

  const allowOnlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, '')
  }

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h3" mb={3}>
        Create challenge
      </Typography>
      <Card
        sx={{
          backgroundColor: 'secondary.dark',
          position: 'relative',
          overflow: 'visible',
          padding: (theme) => theme.spacing(1),
          margin: (theme) => theme.spacing(0, 0, 4, 0),
        }}
      >
        <CardContent>
          <Stack spacing={2} width="60%">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} variant="outlined" label="Challenge name" />}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextField {...field} variant="outlined" label="Description" />}
            />
            <Controller
              name="tokenAmount"
              control={control}
              render={({ field: { onChange, value, ...restProps } }) => (
                <TextField
                  {...restProps}
                  value={value}
                  variant="outlined"
                  onChange={(e) => onChange(allowOnlyNumber(e.target.value))}
                  label="Amount"
                />
              )}
            />
            <Controller
              name="minDepositAmount"
              control={control}
              render={({ field: { onChange, value, ...restProps } }) => (
                <TextField
                  {...restProps}
                  value={value}
                  onChange={(e) => onChange(allowOnlyNumber(e.target.value))}
                  variant="outlined"
                  label="Deposit Amount"
                />
              )}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Time frame</FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="timeframe"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                    <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Controller
              name="numberOfTimeFrame"
              control={control}
              render={({ field: { onChange, value, ...restProps } }) => (
                <TextField
                  {...restProps}
                  value={value}
                  onChange={(e) => onChange(allowOnlyNumber(e.target.value))}
                  variant="outlined"
                  label="Time frame"
                />
              )}
            />
            <Controller
              name="startAt"
              control={control}
              render={({ field: { onChange, value, ...restProps } }) => (
                <DesktopDatePicker
                  {...restProps}
                  value={value}
                  minDate={new Date()}
                  label="Start at"
                  onChange={(v) => onChange(v?.getTime())}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" isLoading={isLoading}>
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default CreateChallenge
