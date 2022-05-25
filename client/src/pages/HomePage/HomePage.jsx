import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const accessToken = useSelector((state) => state.userData.accessToken);
  const testToken = () => {
    axios
      .get('/v1/users', {
        headers: { Authorization: `Bearer ${accessToken.token}` },
      })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Box component={Paper} sx={{ minHeight: '100vh' }} square>
      <Grid container>
        <Grid item sx={{ p: 2 }} xs={12}>
          <Button onClick={testToken}>LOL</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
