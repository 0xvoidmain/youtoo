import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardActions, CardContent, Typography } from '@mui/material'

import Button from '~/components/Button'
import { createChallegeSchema } from '~/schema/createChallengeSchema'

export const CREATE_CHALLENGE_ROUTE = '/create-challenge'
const CreateChallenge = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createChallegeSchema),
  })

  const onSubmit = (data: any) => console.log(data)

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
          <Typography variant="h3"></Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">Create</Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default CreateChallenge
