import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fromUnixTime } from 'date-fns'

import { Card, CardActions, CardContent, Typography } from '@mui/material'

import Button from '~/components/Button'
import Container from '~/components/Layout/Container'
import { CHALLENGE_DETAIL_ROUTE } from '~/pages/ChallengeDetail'
import { selectChallenges } from '~/state/reducers/app'
import Http from '~/utils/httpUtils'

import Progress from '../components/Progress'
import { IChallange } from '../types'

const MyChallenges = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [challenges, setChallenges] = useState<IChallange[]>([])
  const onHandleNavigateToDetail = useCallback((id: string) => {
    navigate(`${CHALLENGE_DETAIL_ROUTE}/${id}`)
  }, [])

  useEffect(() => {
    const fetchMyChallenge = async () => {
      try {
        setIsLoading(true)
        const { data } = await Http.get('/MyChallenges', {})
        setChallenges(data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchMyChallenge()
  }, [])

  return (
    <Container isLoading={isLoading}>
      {challenges.map(({ name, _id, amount, depositAmount, description, numberOfTimeFrame, startAt }) => {
        return (
          <Card
            key={_id}
            sx={{
              backgroundColor: 'secondary.dark',
              padding: (theme) => theme.spacing(1),
              margin: (theme) => theme.spacing(0, 0, 4, 0),
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h2">
                {name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="subtitle1">
                {description}
              </Typography>
              <Typography variant="subtitle1">Thời gian: {startAt}</Typography>
              {/* <Typography variant="subtitle1">Quỹ thưởng: ${prize}</Typography> */}
              <Typography variant="subtitle1">Số tiền cam kết tối thiểu: ${depositAmount}</Typography>
              {/* <Typography variant="subtitle1" fontWeight={600}>
                {numberOfCommittedPeople} người đăng ký tham gia
              </Typography> */}

              <Typography variant="h6" fontWeight={800} mt={(theme) => theme.spacing(1)}>
                Progress:
              </Typography>
              <Progress
                variant="determinate"
                value={30}
                sx={{
                  marginTop: (theme) => theme.spacing(1),
                }}
              />
            </CardContent>
            <CardActions>
              <Button onClick={() => onHandleNavigateToDetail(_id)} variant="contained">
                Details
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </Container>
  )
}

export default MyChallenges
