import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AlertTitle, Grow, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { Copyright } from '../../components';
import useAuth from '../../auth/useAuth';

const emptyCredentials = {
  email: '',
  password: '',
};

export default function SignIn() {
  const { login } = useAuth();
  const [userCredentials, setUserCredentials] = useState(emptyCredentials);
  const [loginProcess, setLoginProcess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loginErrorAlertOpen, setLoginErrorAlertOpen] = useState(false);

  const handleFormErrors = (errorMessage) => {
    const errorMessages = errorMessage.split(',');
    const errorFields = errorMessages.map((message) => message.split(':'));
    const _errorObj = {};
    for (let i = 0; i < errorFields.length; i += 1) {
      const [property, value] = errorFields[i];
      _errorObj[property] = value;
    }
    setFormErrors(_errorObj);
  };

  const handleErrors = (response) => {
    if (response.status === 401) {
      if (response.data.message === 'Incorrect email or password') setLoginErrorAlertOpen(true);
    }
    if (response.status === 400) {
      handleFormErrors(response.data.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginProcess(true);
    axios
      .post('/v1/auth/login', {
        ...userCredentials,
      })
      .then((response) => {
        if (response.status === 200) {
          setLoginProcess(false);
          login(response.data);
        }
      })
      .catch((err) => {
        setLoginProcess(false);
        handleErrors(err.response);
      });
  };

  const handleTextFieldChange = (event) => {
    const { value } = event.currentTarget;
    const { name } = event.currentTarget;
    if (formErrors[name]) delete formErrors[name];
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {loginErrorAlertOpen && (
              <Grow in={loginErrorAlertOpen} sx={{ mb: 4 }}>
                <Alert severity="error" variant="filled" onClose={() => setLoginErrorAlertOpen(false)}>
                  <AlertTitle>Email already registered</AlertTitle>
                  If you forgot your password — <strong>reset it here!</strong>
                </Alert>
              </Grow>
            )}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userCredentials.email}
              onChange={handleTextFieldChange}
            />
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userCredentials.password}
              onChange={handleTextFieldChange}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <LoadingButton loading={loginProcess} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink style={{ textDecoration: 'none' }} to="/sign-up">
                  <Typography sx={{ textDecoration: 'underline', color: 'primary.main' }} variant="body2">
                    Don&apos;t have an account? Sign Up
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
