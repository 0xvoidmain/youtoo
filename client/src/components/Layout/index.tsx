import React, { ReactNode } from 'react'

import { Avatar, Box, Button, Grid, List, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'

import CloudImageSrc from '~/assets/images/clouds.png'
import AvatarSrc from '~/assets/images/leviacker.jpg'

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  marginRight: theme.spacing(1),
  fontSize: '18px',
}))

const navItems = ['Home', 'About', 'Contact']
interface ILayout {
  children: ReactNode
}

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

const CloudImage = styled('img')({
  width: '100%',
  bottom: 0,
  height: '300px',
  zIndex: '0',
})

const Layout = ({ children }: ILayout) => {
  return (
    <Wrapper>
      <Box>
        <Grid container padding={5}>
          <Grid item xs={12} justifyContent="space-between" display="flex">
            <Typography variant="h1" padding="6px 8px" color={(theme) => theme.palette.common.white}>
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

              <Avatar
                alt="dummy avatar"
                src={AvatarSrc}
                sx={{
                  width: 45,
                  height: 45,
                  marginRight: 2,
                }}
              />
              <WalletMultiButton />
            </Box>
          </Grid>
        </Grid>
        <Box
          component="main"
          maxWidth="1100px"
          width="100%"
          margin="0 auto"
          sx={{
            zIndex: 1,
          }}
        >
          {children}
        </Box>
      </Box>

      <CloudImage src={CloudImageSrc} />
    </Wrapper>
  )
}

export default Layout
