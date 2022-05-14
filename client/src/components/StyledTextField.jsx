import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function StyledTextField(props) {
  return <TextField margin="dense" size="small" fullWidth {...props} />;
}
