import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import find from 'lodash/find'

import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

import AvatarSrc from '~/assets/images/leviacker.jpg'
import Button from '~/components/Button'
import Container from '~/components/Layout/Container'
import TextField from '~/components/TextField'
import configs from '~/configurations'
import { useAppDispatch } from '~/state'
import { selectChallenges, setType } from '~/state/reducers/app'

// import { HOME_ROUTE } from '../Home'
import Progress from '../Home/components/Progress'
import { defaultIChallengeValue, IChallange } from '../Home/types'

export const CHALLENGE_DETAIL_ROUTE = '/challenge'

const ChallangeDetail = () => {
  const { challengeId } = useParams()
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
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
  const [commentTxt, setCommentTxt] = useState<string>('')
  const [challengeDetail, setChallengeDetail] = useState<IChallange>(defaultIChallengeValue)
  const { amount, depositAmount, description, name, numberOfTimeFrame, startAt, tokenName, _id } = challengeDetail
  // const isJoinedChallenge = useMemo(() => {
  //   return type === 'Joined'
  // }, [type])

  useEffect(() => {
    const fetchChallengeDetail = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.post(`${configs.apiUrl}/Challenge`, {
          challengeId,
        })
        setChallengeDetail(data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchChallengeDetail()
  }, [])

  const onHandleJoinChallange = useCallback((id: string) => {
    setNotiState({
      open: true,
      Transition: Fade,
    })
  }, [])

  const addComment = (comment: string) => {}

  const handleClose = () => {
    setNotiState({
      ...notiState,
      open: false,
    })
  }

  return (
    <Container isLoading={isLoading}>
      <Card
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
          {/* <Typography variant="subtitle1" fontWeight={800}>
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
      </Card>
      <Button onClick={() => onHandleJoinChallange(_id)} variant="contained">
        Join Challenge
      </Button>
      <Divider
        variant="middle"
        light
        sx={{
          borderColor: '#53545e',
          margin: (theme) => theme.spacing(4, 0, 4, 0),
        }}
      />
      <Typography variant="h3" mb={1}>
        Today challenge
      </Typography>
      <Alert
        variant="outlined"
        severity="info"
        sx={{
          mb: (theme) => theme.spacing(4),
          '& > .MuiAlert-message': {
            color: 'white',
          },
        }}
      >
        <Typography variant="body1" mb={1.5}>
          Bạn cần chống đẩy 30 lần trong ngày hôm nay
        </Typography>
        <Button variant="contained">Start</Button>
      </Alert>
      <Divider
        variant="middle"
        light
        sx={{
          borderColor: '#53545e',
          margin: (theme) => theme.spacing(4, 0, 4, 0),
        }}
      />
      <Typography variant="h3" mb={1}>
        Challenge history
      </Typography>
      <Accordion
        sx={{
          '&': {
            backgroundColor: '#4a4953',
            borderRadius: '4px',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}></AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Divider
        variant="middle"
        light
        sx={{
          borderColor: '#53545e',
          margin: (theme) => theme.spacing(4, 0, 4, 0),
        }}
      />
      <>
        <Typography variant="h3" mb={1}>
          Comments
        </Typography>
        <Paper
          sx={{
            backgroundColor: '#4a4953',
          }}
        >
          <Box sx={{ p: '15px' }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar src={AvatarSrc} variant="rounded" alt="user-avatar" />
              <TextField
                multiline
                fullWidth
                minRows={4}
                placeholder="Add a comment"
                value={commentTxt}
                onChange={(e) => {
                  setCommentTxt(e.target.value)
                }}
              />
              <Button
                size="large"
                variant="contained"
                sx={{
                  p: '8px 25px',
                  '&:hover': {
                    bgcolor: 'custom.lightGrayishBlue',
                  },
                }}
                onClick={(e) => {
                  !commentTxt.trim() ? e.preventDefault() : addComment(commentTxt.trim())
                  setCommentTxt('')
                }}
              >
                Send
              </Button>
            </Stack>
          </Box>
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
    </Container>
  )
}

export default ChallangeDetail
