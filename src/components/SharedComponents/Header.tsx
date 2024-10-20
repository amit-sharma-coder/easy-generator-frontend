import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position='static' style={{ marginBottom: '50px' }}>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          <Link to='/' style={{ textDecorationLine: 'none', color: 'white' }}>Easy Generator</Link>
        </Typography>
        {((location.pathname) !== '/signup' && (location.pathname) !== '/dashboard') && (
          <Button color='inherit' component={Link} to='/signup'>
            Sign Up
          </Button>
        )}
        {((location.pathname) !== '/' && location.pathname !== '/login' && (location.pathname) !== '/dashboard') && (
        <Button color='inherit' component={Link} to='/'>
          Log In
        </Button>
        )}
        {((location.pathname) !== '/dashboard') && (
        <Button color='inherit' component={Link} to='/dashboard'>
          Dashboard
        </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
