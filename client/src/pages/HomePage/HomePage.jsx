import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

export default function HomePage() {
  return (
    <Box container component={Paper} sx={{ minHeight: '100vh' }} square>
      <Grid>
        <TopBar />
        <Grid item sx={{ p: 2 }} xs={12}>
          <Outlet />
        </Grid>
        <BottomBar />
      </Grid>
    </Box>
  );
}
