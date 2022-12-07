import React from 'react'
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
import { createChallegeSchema } from '~/schema/createChallengeSchema'

export const CREATE_CHALLENGE_ROUTE = '/create-challenge'
const CreateChallenge = () => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(createChallegeSchema),
    reValidateMode: 'onChange',
  })

  const { errors } = formState
  const onSubmit = (data: any) => console.log(data)
  console.log(errors, 'errors ?')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="Amount"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              )}
            />
            <Controller
              name="minDepositAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="Deposit Amount"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
              name="startAt"
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  minDate={new Date()}
                  label="Start at"
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              )}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default CreateChallenge
