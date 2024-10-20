import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Dashboard: React.FC = () => {
  const { logout, name } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Typography variant='body1'>
        Welcome <strong>{name}</strong> to your dashboard!
      </Typography>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginTop: '20px' }}
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </Container>
  );
};

export default Dashboard;
