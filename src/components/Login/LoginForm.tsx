import React, { useState } from 'react';
import { Button, Grid2 as Grid, Snackbar } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { IErrorResponse } from '../SharedComponents/CommonTypes.interface';
import CustomTextField from '../SharedComponents/CustomTextField';
import { useAuth } from '../Auth/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email,
        password,
      });
      login(response.data.token);
      setSuccess(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError<IErrorResponse>;
      const errorMessage: string = axiosError.response?.data.message || 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <CustomTextField label='Email' type='email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          </Grid>
          <Grid size={12}>
            <CustomTextField label='Password' type='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Log In
        </Button>
      </form>
      <Snackbar
        open={Boolean(error)}
        message={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      />
      <Snackbar
        open={Boolean(success)}
        message={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      />
    </>
  );
};

export default LoginForm;