import { Box, Button, Container, Paper, Typography } from '@mui/material';
import authService from '../services/authService';

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
        height: '100vh',
      }}
      id='login'
      data-testid='login'
    >
      <Container
        maxWidth='xs'
      >
        <Paper
          elevation={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <Box
            sx={{
              mb: 2,
              color: 'white'
            }}
          >
            <Typography variant='h3' component="h1" sx={{ textAlign: 'center' }}>Reddit Viewer</Typography>
            <Typography variant='body1' gutterBottom sx={{ textAlign: 'center' }}>All your best Reddit posts in one place.</Typography>
          </Box>
            <Button variant="contained" onClick={() => authService.login()}>Login to Reddit</Button>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login