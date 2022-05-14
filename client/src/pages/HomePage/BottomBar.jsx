import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import { Drawer, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../auth/useAuth';
import ROUTES from '../../util/routes';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomBar() {
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenu = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {/* <Toolbar /> */}
      <AppBar
        position="fixed"
        color="primary"
        enableColorOnDark
        sx={{ top: 'auto', bottom: 0, borderTopLeftRadius: 7, borderTopRightRadius: 7 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Foorum
          </Typography>
          <StyledFab color="error" aria-label="add">
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </StyledFab>
        </Toolbar>
      </AppBar>
      <Drawer anchor="bottom" open={drawerOpen} onClose={handleClose}>
        <MenuItem component={Link} to={ROUTES.PROFILE} onClick={handleClose}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Drawer>
    </Box>
  );
}
