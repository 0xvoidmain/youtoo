import React from 'react'

import { Card, CardActions, CardContent, Typography } from '@mui/material'

import Button from '~/components/Button'

import { IChallange } from '../types'

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
    title: 'Đi bộ 5000 bước',
    challangeDescription: 'Mua 5 SOL mỗi ngày để trở thành tỷ phú sau 2 năm nữa các bạn ơi',
    prize: 5000,
    minCommittedAmount: 20,
    numberOfCommittedPeople: 3000,
    time: 'từ 1/1/2022 đến 1/2/2022',
  },
  {
    id: 3,
    title: 'Đoc tiểu thuyết sự im lặng của bầy cừu',
    challangeDescription: 'Mua 5 SOL mỗi ngày để trở thành tỷ phú sau 2 năm nữa các bạn ơi',
    prize: 5000,
    minCommittedAmount: 20,
    numberOfCommittedPeople: 3000,
    time: 'từ 1/1/2022 đến 1/2/2022',
  },
]

const MyChallenges = () => {
  return (
    <>
      <>
        {dummyChallanges.map(
          ({ title, time, challangeDescription, prize, minCommittedAmount, numberOfCommittedPeople, id }) => {
            return (
              <Card
                sx={{
                  backgroundColor: 'secondary.dark',
                  padding: (theme) => theme.spacing(1),
                  margin: (theme) => theme.spacing(0, 0, 4, 0),
                }}
              >
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
                  <Button onClick={() => {}} variant="contained">
                    Details
                  </Button>
                </CardActions>
              </Card>
            )
          },
        )}
      </>
    </>
  )
}

export default MyChallenges
