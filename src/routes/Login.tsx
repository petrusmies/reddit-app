import { Box, Button } from '@mui/material'
import authService from '../services/authService'

const auth: { code: string } | { error: string } | null = authService.auth();

// If auth has property code, get access token by authService.oauth and set in localStorage by authService.setToken()
if(auth && 'code' in auth) {
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
    <Box>
      <h1>Login</h1>
      <Button variant="contained" onClick={() => authService.login()}>Login</Button>
    </Box>
  )
}

export default Login