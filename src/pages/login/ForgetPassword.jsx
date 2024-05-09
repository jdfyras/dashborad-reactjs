import { useState } from 'react' // Removed unused React import
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <span color='inherit'>Dash</span> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const defaultTheme = createTheme() // Optionally comment on why a custom theme is necessary

export default function SignInSide() {
  const [emailError, setEmailError] = useState(false) // Renamed for camelCase consistency
  const [email, setEmail] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    // console.log("email is: ", email);
    await fetch('http://127.0.0.1:5000/api/reset', {
      method: 'POST',
      body: JSON.stringify({ email: email })
    }).then(response => response.json())
    // .then((data) => console.log(data)); // Now using the response data correctly
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
    setEmailError(!e.target.validity.valid)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(src/assets/logo.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box padding={2}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Forget Password
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? 'Please enter your email address' : ''}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='/login' variant='body2'>
                    Login
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
