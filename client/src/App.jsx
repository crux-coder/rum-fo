import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import LogRocket from 'logrocket';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ROUTES from './util/routes';
import './App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';

LogRocket.init('kyqsuv/foorum');

LogRocket.identify('62803befe269f91384dcb2e4', {
  name: 'Jasmin Mustafic',
  email: 'mustaficjasmin7@gmail.com',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1B998B',
    },
    secondary: {
      main: '#A393BF',
    },
    error: {
      main: '#E84855',
    },
    warning: {
      main: '#FFFD82',
    },
    success: {
      main: '#1B998B',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path={ROUTES.MAIN}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        >
          <Route index path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route exact path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route exact path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route exact path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route exact path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
