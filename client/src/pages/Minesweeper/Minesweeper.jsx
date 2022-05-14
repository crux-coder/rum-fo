import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function ProfilePage() {
  return (
    <Grid container component="main">
      <Grid
        item
        sx={{ p: 2 }}
        xs={12}
        component={Paper}
        elevation={6}
        square
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container></Grid>
      </Grid>
    </Grid>
  );
}
