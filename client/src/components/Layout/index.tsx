import React, { ReactNode, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Avatar, Box, Button, Grid, IconButton, List, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'

import CloudImageSrc from '~/assets/images/clouds.png'
import AvatarSrc from '~/assets/images/leviacker.jpg'
import configs from '~/configurations'
import { HOME_ROUTE } from '~/pages/Home'
import { SETTING_ROUTE } from '~/pages/Setting'
import { useAppDispatch } from '~/state'
import { selectAuthInfo, setAuthInfo } from '~/state/reducers/app'
import { IAuth } from '~/state/reducers/types'
import Http from '~/utils/httpUtils'
import { AUTH_TOKEN, setToLocalStorage } from '~/utils/localStorage'

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  marginRight: theme.spacing(1),
  fontSize: '18px',
}))

const navItems = ['Home', 'About', 'Contact']
interface ILayout {
  children: ReactNode
}

const Wrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  minHeight: '100vh',
}))

const CloudImage = styled('img')({
  width: '100%',
  bottom: 0,
  height: '300px',
  zIndex: '0',
})

const settings = [
  {
    title: 'Setting',
    routeName: SETTING_ROUTE,
  },
]

const Layout = ({ children }: ILayout) => {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { AccessToken } = useSelector(selectAuthInfo)
  const { connected, publicKey } = useWallet()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onNavigateToRoute = (routeName: string) => {
    handleCloseUserMenu()
    navigate(routeName)
  }

  const address = useMemo(() => {
    if (publicKey) return publicKey?.toBase58()

    return null
  }, [publicKey])

  const onHandleLogin = async () => {
    try {
      const name = prompt("Enter your name please")
      if (!name) return
      setIsLoadingLogin(true)
      
      const { data: { AccessToken, AccessTokenExpireTime } = {} } = await Http.post(`/Auth`, {
        address,
        name,
      })
      setToLocalStorage<IAuth>(AUTH_TOKEN, {
        AccessToken,
        AccessTokenExpireTime,
      })
      setIsLoadingLogin(false)
    } catch (error) {
      setIsLoadingLogin(false)
    }
  }
  return (
    <Wrapper direction="column" justifyContent="space-between">
      <Stack flex={1} flexDirection="column">
        <Grid container padding={5}>
          <Grid item xs={12} justifyContent="space-between" display="flex">
            <Typography
              variant="h1"
              onClick={() => navigate(HOME_ROUTE)}
              padding="6px 8px"
              color={(theme) => theme.palette.common.white}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              Reward Network
            </Typography>
            <Box display="flex">
              <List>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {navItems.map((item) => (
                    <StyledButton key={item}>{item}</StyledButton>
                  ))}
                </Box>
              </List>
              <Box mr={2}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt="dummy avatar"
                      src={AvatarSrc}
                      sx={{
                        width: 45,
                        height: 45,
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '60px',
                    '& > .MuiPaper-root': {
                      backgroundColor: '#4a4953',
                      left: '750px',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(({ title, routeName }) => (
                    <MenuItem key={title} onClick={() => onNavigateToRoute(routeName)}>
                      <Typography textAlign="center">{title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <WalletMultiButton />
              {!AccessToken && (
                <Button
                  onClick={onHandleLogin}
                  variant="contained"
                  sx={{
                    marginLeft: (theme) => theme.spacing(2),
                  }}
                >
                  Log in
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box component="main" maxWidth="900px" width="100%" margin="0 auto">
          {children}
        </Box>
      </Stack>

      <CloudImage src={CloudImageSrc} />
    </Wrapper>
  )
}

export default Layout
