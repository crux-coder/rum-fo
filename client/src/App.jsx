import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ROUTES from './util/routes';
import './App.css';

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
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut');
  }, [location, displayLocation]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransistionStage('fadeIn');
            setDisplayLocation(location);
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route exact path="/" element={<Navigate to={ROUTES.SIGN_IN} />} />
          <Route exact path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
