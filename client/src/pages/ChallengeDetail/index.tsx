import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useAppDispatch } from '~/state'
import { selectChallenges, setType } from '~/state/reducers/app'
import { IChallange } from '~/state/reducers/types'

import { HOME_ROUTE } from '../Home'

export const CHALLENGE_DETAIL_ROUTE = '/challenge'

const ChallangeDetail = () => {
  const { challengeId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const dummyChallanges = useSelector(selectChallenges)
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
  const { title, time, challangeDescription, prize, minCommittedAmount, numberOfCommittedPeople, id, type } = useMemo<
    IChallange | Record<string, any>
  >(() => {
    return find(dummyChallanges, (c) => c.id === Number(challengeId)) || {}
  }, [challengeId])

  const isJoinedChallenge = useMemo(() => {
    return type === 'Joined'
  }, [type])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const onHandleJoinChallange = useCallback((id: number) => {
    setNotiState({
      open: true,
      Transition: Fade,
    })
    dispatch(
      setType({
        id,
        type: 'Joined',
      }),
    )
    setTimeout(() => {
      navigate(HOME_ROUTE)
    }, 1000)
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
        onClick={() => onHandleJoinChallange(id)}
        disabled={isJoinedChallenge}
        variant="contained"
        sx={{
          margin: (theme) => theme.spacing(0, 0, 4, 0),
        }}
      >
        {isJoinedChallenge ? 'Already Joined' : 'Join challange'}
      </Button>
      <Divider
        variant="middle"
        light
        sx={{
          borderColor: '#53545e',
        }}
      />
      <Typography
        variant="h3"
        sx={{
          margin: (theme) => theme.spacing(4, 0, 2, 0),
        }}
      >
        Today challenge
      </Typography>
      <Divider
        variant="middle"
        light
        sx={{
          borderColor: '#53545e',
        }}
      />
      <Accordion
        sx={{
          margin: (theme) => theme.spacing(4, 0, 4, 0),
          '&': {
            backgroundColor: '#4a4953',
            borderRadius: '4px',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h3">Challenge history</Typography>
        </AccordionSummary>
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
        }}
      />
      <>
        <Typography
          variant="h3"
          sx={{
            margin: (theme) => theme.spacing(4, 0, 2, 0),
          }}
        >
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
