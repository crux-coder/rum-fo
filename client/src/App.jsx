import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ROUTES from './util/routes';
import './App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

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
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route exact path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route exact path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
