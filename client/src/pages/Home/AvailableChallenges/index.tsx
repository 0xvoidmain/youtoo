import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Card, CardActions, CardContent, Typography } from '@mui/material'

import Button from '~/components/Button'
import { CHALLENGE_DETAIL_ROUTE } from '~/pages/ChallengeDetail'
import { selectChallenges } from '~/state/reducers/app'

import Ribbon from '../components/Ribbon'

const AvailalbeChallenges = () => {
  const navigate = useNavigate()
  const dummyChallanges = useSelector(selectChallenges)
  const onHandleNavigateToDetail = useCallback((id: number) => {
    navigate(`${CHALLENGE_DETAIL_ROUTE}/${id}`)
  }, [])

  return (
    <>
      {dummyChallanges.map(
        ({ title, time, challangeDescription, prize, minCommittedAmount, numberOfCommittedPeople, id, type }) => {
          return (
            <Card
              sx={{
                backgroundColor: 'secondary.dark',
                position: 'relative',
                overflow: 'visible',
                padding: (theme) => theme.spacing(1),
                margin: (theme) => theme.spacing(0, 0, 4, 0),
              }}
            >
              <Ribbon type={type} />
              <CardContent>
                <Typography gutterBottom variant="h2">
                  {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="subtitle1">
                  {challangeDescription}
                </Typography>
                <Typography variant="subtitle1">Thời gian: {time}</Typography>
                <Typography variant="subtitle1">Quỹ thưởng: ${prize}</Typography>
                <Typography variant="subtitle1">Số tiền cam kết tối thiểu: ${minCommittedAmount}</Typography>
                <Typography variant="subtitle1" fontWeight={800}>
                  {numberOfCommittedPeople} người đăng ký tham gia
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => onHandleNavigateToDetail(id)} variant="contained">
                  Details
                </Button>
              </CardActions>
            </Card>
          )
        },
      )}
    </>
  )
}

export default AvailalbeChallenges
