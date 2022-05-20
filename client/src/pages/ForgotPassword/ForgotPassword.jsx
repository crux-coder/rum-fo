import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Alert, Divider, Grow } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Copyright } from '../../components';
import ROUTES from '../../util/routes';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sendingResetRequest, setSendingResetRequest] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

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
      if (response.data.message === 'Incorrect email or password') setEmailSent(true);
    }
    if (response.status === 400) {
      handleFormErrors(response.data.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSendingResetRequest(true);
    axios
      .post('/v1/auth/forgot-password', {
        email,
      })
      .then(() => {
        setSendingResetRequest(false);
        setEmailSent(true);
      })
      .catch((err) => {
        setSendingResetRequest(false);
        handleErrors(err.response);
      });
  };

  const handleTextFieldChange = (event) => {
    const { value } = event.currentTarget;
    const { name } = event.currentTarget;
    if (formErrors[name]) delete formErrors[name];
    setEmail(value);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        square
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component={Paper}
          elevation={6}
          sx={{
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {emailSent ? (
              <Grow in={emailSent} sx={{ mb: 4 }}>
                <Alert variant="filled">
                  <Typography>Email has been sent to: {email}. Please check your inbox to reset password.</Typography>
                </Alert>
              </Grow>
            ) : (
              <>
                <TextField
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleTextFieldChange}
                  error={formErrors.email}
                  helperText={formErrors.email && formErrors.email}
                />
                <LoadingButton
                  loading={sendingResetRequest}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </LoadingButton>
              </>
            )}
            <Divider />
            <Grid container spacing={0}>
              <Grid item xs={5}>
                <RouterLink style={{ textDecoration: 'none' }} to={ROUTES.SIGN_IN} variant="body2">
                  <Typography sx={{ textDecoration: 'underline', color: 'primary.main' }} textAlign="right" variant="body1">
                    Sign In
                  </Typography>
                </RouterLink>
              </Grid>
              <Grid item xs={2}>
                <Typography textAlign="center" color="textSecondary" variant="body1">
                  OR
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <RouterLink style={{ textDecoration: 'none' }} to={ROUTES.SIGN_UP}>
                  <Typography sx={{ textDecoration: 'underline', color: 'primary.main' }} textAlign="left" variant="body1">
                    Sign Up
                  </Typography>
                </RouterLink>
              </Grid>
              <Grid item xs={12}>
                <Copyright sx={{ mt: 7 }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
