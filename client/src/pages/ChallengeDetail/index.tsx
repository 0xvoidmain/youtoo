import React, { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import find from 'lodash/find'

import { Alert, Avatar, Card, CardContent, Divider, Fade, Grid, Paper, Snackbar, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

import AvatarSrc from '~/assets/images/leviacker.jpg'
import Button from '~/components/Button'

import { dummyChallanges, IChallange } from '../Home/AvailableChallenges'

export const CHALLENGE_DETAIL_ROUTE = '/challenge'

const ChallangeDetail = () => {
  const { challengeId } = useParams()
  const [notiState, setNotiState] = useState<{
    open: boolean
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>
      }
    >
  }>({
    open: false,
    Transition: Fade,
  })
  const { title, time, challangeDescription, prize, minCommittedAmount, numberOfCommittedPeople } = useMemo<
    IChallange | Record<string, any>
  >(() => {
    return find(dummyChallanges, (c) => c.id === Number(challengeId)) || {}
  }, [challengeId])

  const onHandleJoinChallange = useCallback(() => {
    setNotiState({
      open: true,
      Transition: Fade,
    })
  }, [])

  const handleClose = () => {
    setNotiState({
      ...notiState,
      open: false,
    })
  }

  return (
    <>
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
      </Card>
      <Button
        onClick={onHandleJoinChallange}
        variant="contained"
        sx={{
          margin: (theme) => theme.spacing(0, 0, 4, 0),
        }}
      >
        Join challange
      </Button>
      <Divider
        variant="middle"
        light
        sx={{
          borderColor: '#53545e',
        }}
      />
      <>
        <Typography
          variant="h3"
          sx={{
            margin: (theme) => theme.spacing(4, 0, 0, 0),
          }}
        >
          Comments
        </Typography>
        <Paper
          sx={{
            backgroundColor: '#4a4953',
            padding: (theme) => theme.spacing(2),
            margin: (theme) => theme.spacing(4, 0, 0, 0),
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={AvatarSrc} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                Michel Michel
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis
                bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor.
                Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec
                faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque
                risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                lectus vitae ex.{' '}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          sx={{
            backgroundColor: '#4a4953',
            padding: (theme) => theme.spacing(2),
            margin: (theme) => theme.spacing(4, 0, 0, 0),
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={AvatarSrc} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                Michel Michel
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis
                bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor.
                Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec
                faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque
                risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                lectus vitae ex.{' '}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          open={notiState.open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={2500}
          TransitionComponent={notiState.Transition}
          key={notiState.Transition.name}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <Typography
              sx={{
                color: 'black',
              }}
              variant="caption"
            >
              Successfully join the challenge
            </Typography>
          </Alert>
        </Snackbar>
      </>
    </>
  )
}

export default ChallangeDetail
