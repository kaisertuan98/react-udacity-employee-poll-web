import { useDispatch } from 'react-redux';
import loginImage from '../assets/login.png';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLogin } from '../../redux/loginSlice';
import { checkLogin } from '../../redux/utils/loginAPI';
import { Alert, LoadingButton } from '@mui/lab';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

const Login = () => {
  const location = useLocation();
  const [showError, setShowError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const usernameVal = data.get('username');
    const passwordVal = data.get('password');
    checkLogin(usernameVal, passwordVal).then((result) => {
      setLoading(false);
      if (result) {
        dispatch(setLogin({ id: usernameVal }));
        setShowError(false);
        navigate(location?.state?.prevUrl ? location?.state?.prevUrl : '/');
      } else {
        setShowError(true);
      }
    });
  };

  const handleCloseAlert = () => {
    setShowError(false)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User"
                name="username"
                autoFocus
                data-testid='username'
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                data-testid='password'
              />
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid='submit-btn'
              >
                Sign In
              </LoadingButton>
              <Snackbar
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showError}
                onClose={handleCloseAlert}
              >
                <Alert severity="error">Invalid username or password. Please try again!</Alert>
              </Snackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
