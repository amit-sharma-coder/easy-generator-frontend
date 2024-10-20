import React from 'react';
import { Container, Paper } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {children}
      </Paper>
    </Container>
  );
};

export default MainLayout;
