import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/system'

import Button from '~/components/Button'
import { CHALLENGE_DETAIL_ROUTE } from '~/pages/ChallengeDetail'

import { IChallange } from '../types'

const RibbonWrapper = styled(Box)(({ theme }) => ({
  width: '130px',
  height: '130px',
  top: '-10px',
  right: '-10px',
  overflow: 'hidden',
  position: 'absolute',
  '&:before, &:after': {
    position: 'absolute',
    zIndex: 1,
    content: '""',
    display: 'block',
    border: '5px solid #4caf50d9',
  },
  '&:before': {
    top: 0,
    left: '10px',
  },
  '&:after': {
    bottom: '11px',
    right: 0,
  },
  '& > span': {
    position: 'absolute',
    display: 'block',
    minWidth: '220px',
    fontSize: '12px',
    fontWeight: 600,
    textAlign: 'center',
    padding: '15px 0',
    backgroundColor: '#4caf50',
    boxShadow: '0 5px 10px rgba(0,0,0,.1)',
    color: '#fff',
    textShadow: '0 1px 1px rgba(0,0,0,.2)',
    left: '-24px',
    top: '23px',
    zIndex: 2,
    transform: 'rotate(45deg)',
  },
}))

export const dummyChallanges: IChallange[] = [
  {
    id: 1,
    title: 'Chống đẩy 30 lần',
    challangeDescription:
      'Chống đẩy mỗi ngày để ngực đẹp hơn nào baby. Chống đẩy 30 ngày liên tục, ngực đẹp hơn nhiều lắm các bạn ơi',
    prize: 5000,
    minCommittedAmount: 20,
    numberOfCommittedPeople: 300,
    time: 'từ 1/1/2022 đến 1/2/2022',
  },
  {
    id: 2,
    title: 'Mua 5 SOL mỗi ngày',
    challangeDescription: 'Mua 5 SOL mỗi ngày để trở thành tỷ phú sau 2 năm nữa các bạn ơi',
    prize: 5000,
    minCommittedAmount: 20,
    numberOfCommittedPeople: 3000,
    time: 'từ 1/1/2022 đến 1/2/2022',
  },
]

const AvailalbeChallenges = () => {
  const navigate = useNavigate()

  const onHandleNavigateToDetail = useCallback((id: number) => {
    navigate(`${CHALLENGE_DETAIL_ROUTE}/${id}`)
  }, [])

  return (
    <>
      {dummyChallanges.map(
        ({ title, time, challangeDescription, prize, minCommittedAmount, numberOfCommittedPeople, id }) => {
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
              <RibbonWrapper>
                <span>Joined</span>
              </RibbonWrapper>
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
