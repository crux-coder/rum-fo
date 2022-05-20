import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertTitle, Grow, LinearProgress, Slide } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Copyright } from '../../components';

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState(emptyUser);
  const [formErrors, setFormErrors] = useState({});
  const [registrationInProcess, setRegistrationInProcesss] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openEmailTakenAlert, setOpenEmailTakenAlert] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const handleOpenEmailTakenAlert = () => {
    setOpenEmailTakenAlert(true);
  };

  const handleCloseEmailTakenAlert = () => {
    setOpenEmailTakenAlert(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    navigate('/sign-in');
    setOpenSuccessSnackbar(false);
  };

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
    if (response.status === 400) {
      if (response.data.message === 'Email already taken') handleOpenEmailTakenAlert();
      else handleFormErrors(response.data.message);
    } else {
      handleOpenErrorSnackbar();
    }
  };

  const sendConfirmationEmail = (data) => {
    setRegistrationInProcesss(true);
    axios
      .post(
        '/v1/auth/send-verification-email',
        {
          ...data.user,
        },
        {
          headers: { Authorization: `Bearer ${data.tokens.access.token}` },
        }
      )
      .then(() => {
        handleOpenSnackbar();
        setFormErrors({});
        setUser(emptyUser);
        setRegistrationInProcesss(false);
      })
      .catch((err) => {
        setRegistrationInProcesss(false);
        handleErrors(err.response);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRegistrationInProcesss(true);
    axios
      .post('/v1/auth/register', {
        ...user,
      })
      .then((response) => {
        if (response.status === 201) {
          sendConfirmationEmail(response.data);
        }
      })
      .catch((err) => {
        setRegistrationInProcesss(false);
        handleErrors(err.response);
      });
  };

  const handleTextFieldChange = (event) => {
    const { value } = event.currentTarget;
    const { name } = event.currentTarget;
    if (formErrors[name]) delete formErrors[name];
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
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
        sx={{
          borderRight: '2px solid',
          borderColor: 'primary.main',
        }}
      >
        <Box
          component={Paper}
          elevation={8}
          sx={{
            p: 8,
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {openEmailTakenAlert && (
              <Grow in={openEmailTakenAlert} sx={{ mb: 4 }}>
                <Alert severity="error" variant="filled" onClose={handleCloseEmailTakenAlert}>
                  <AlertTitle>Email already registered</AlertTitle>
                  If you forgot your password — <strong>reset it here!</strong>
                </Alert>
              </Grow>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  size="small"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={user.firstName}
                  onChange={handleTextFieldChange}
                  error={!!formErrors.firstName}
                  helperText={!!formErrors.firstName && formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={user.lastName}
                  onChange={handleTextFieldChange}
                  error={!!formErrors.lastName}
                  helperText={!!formErrors.lastName && formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleTextFieldChange}
                  error={!!formErrors.email}
                  helperText={!!formErrors.email && formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handleTextFieldChange}
                  error={!!formErrors.password}
                  helperText={!!formErrors.password && formErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  value={user.confirmPassword}
                  onChange={handleTextFieldChange}
                  error={!!formErrors.confirmPassword}
                  helperText={!!formErrors.confirmPassword && formErrors.confirmPassword}
                />
              </Grid>
            </Grid>
            <LoadingButton type="submit" loading={registrationInProcess} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink style={{ textDecoration: 'none' }} to="/sign-in">
                  <Typography sx={{ textDecoration: 'underline', color: 'primary.main' }} variant="body2">
                    Already have an account? Sign in
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
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
      <Snackbar
        TransitionComponent={TransitionLeft}
        autoHideDuration={5000}
        open={openErrorSnackbar}
        onClose={handleCloseErrorSnackbar}
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <Box>
          <Alert
            sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, width: '100%' }}
            onClose={handleCloseErrorSnackbar}
            variant="filled"
            severity="error"
          >
            <AlertTitle>Something went wrong!</AlertTitle>
            <Typography sx={{ alignItems: 'center' }} variant="body2">
              Please try again.
            </Typography>
          </Alert>
        </Box>
      </Snackbar>
      <Snackbar
        TransitionComponent={TransitionLeft}
        autoHideDuration={3000}
        open={openSuccessSnackbar}
        onClose={handleCloseSnackbar}
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <Box>
          <Alert
            sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, width: '100%' }}
            onClose={handleCloseSnackbar}
            variant="filled"
            severity="success"
          >
            <AlertTitle>Registered succesfully!</AlertTitle>
            <Typography sx={{ alignItems: 'center' }} variant="body2">
              Redirecting to login page.
            </Typography>
          </Alert>
          <LinearProgress color="primary" />
        </Box>
      </Snackbar>
    </Grid>
  );
}
