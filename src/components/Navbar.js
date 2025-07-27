// frontend/src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import auth from '../services/auth';

const Navbar = () => {
  const user = auth.getCurrentUser();

  const handleLogout = () => {
    auth.logout();
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sweet Shop
        </Typography>
        {user ? (
          <>
            {auth.isAdmin() && (
              <Button color="inherit" component={Link} to="/admin">
                Admin Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
// export function Navbar() { /* ... */ }
