import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AlertTitle, Divider, LinearProgress, Slide } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Copyright } from '../../components';
import ROUTES from '../../util/routes';

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const emptyUser = {
  password: '',
  confirmPassword: '',
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(emptyUser);
  const [formErrors, setFormErrors] = useState({});
  const [registrationInProcess, setRegistrationInProcesss] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const handleCloseSnackbar = () => {
    navigate(ROUTES.SIGN_IN);
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
      handleFormErrors(response.data.message);
    } else {
      handleOpenErrorSnackbar();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRegistrationInProcesss(true);
    axios
      .post(`/v1/auth/reset-password?token=${searchParams.get('token')}`, {
        ...user,
      })
      .then((response) => {
        if (response.status === 204) navigate(ROUTES.SIGN_IN);
        setRegistrationInProcesss(false);
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              Reset Password
            </LoadingButton>
          </Box>
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
      </Grid>
      <Snackbar
        TransitionComponent={TransitionLeft}
        autoHideDuration={5000}
        open={openErrorSnackbar}
        onClose={handleCloseErrorSnackbar}
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box>
          <Alert
            sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, width: '100%' }}
            onClose={handleCloseErrorSnackbar}
            variant="filled"
            severity="error"
          >
            <AlertTitle>Reset password link expired!</AlertTitle>
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
