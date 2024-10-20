import React from 'react';
import { Typography } from '@mui/material';
import MainLayout from '../SharedComponents/Layout';
import LoginForm from './LoginForm';

function Login() {
  return (
    <MainLayout>
      <Typography variant='h5' align='center'>
        Log In
      </Typography>
      <LoginForm />
    </MainLayout>
  );
};

export default Login;
