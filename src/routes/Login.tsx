import { Box, Button, Container, Paper, Typography } from '@mui/material'
import authService from '../services/authService'

const auth: { code: string } | { error: string } | null = authService.auth();

// If auth has property code, get access token by authService.oauth and set in localStorage by authService.setToken()
if (auth && 'code' in auth) {
  authService.oauth(auth.code)
    .then((res) => {
      console.log(res)
      authService.setToken(res)
    })
    .then(() => {
      window.location.href = '/'
    })
    .catch((err) => {
      console.log(err)
    })
}

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
      data-testid='login'
    >
      <Container
        maxWidth='xs'
      >
        <Paper
          sx={{
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>Login to Reddit</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Click the button below to login to Reddit.</Typography>
            <Button variant="contained" onClick={() => authService.login()}>Login</Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login