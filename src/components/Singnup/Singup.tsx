import React, { useState } from 'react';
import { Button, Typography, Grid2 as Grid, Snackbar } from '@mui/material';
import MainLayout from '../SharedComponents/Layout';
import axios, { AxiosError } from 'axios';
import CustomTextField from '../SharedComponents/CustomTextField';
import PasswordRequirements from './PasswordRequirements';
import { IErrorResponse } from '../SharedComponents/CommonTypes.interface';
import { IPasswordCondition } from './Signup.interface';

const isStrongPassword = (password: string) => {
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordPattern.test(password);
};

const checkPasswordStrength = (password: string) => {
  const conditions: IPasswordCondition = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@$!%*?&]/.test(password),
  };
  return conditions;
};

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(true);
  const [passwordConditions, setPasswordConditions] = useState<IPasswordCondition>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    setPasswordConditions(checkPasswordStrength(password));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match! Please try again.');
      return;
    }

    if (!isStrongPassword(password)) {
      setError('Password does not meet the strength requirements.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        name,
        email,
        password,
      });
      setSuccess(response.data.message);
      setName('');
      setEmail('')
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      const axiosError = error as AxiosError<IErrorResponse>;
      const errorMessage: string = axiosError.response?.data.message || 'Signup failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <MainLayout>
      <Typography variant='h5' align='center'>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <CustomTextField label='Name' type='text' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </Grid>
          <Grid size={12}>
            <CustomTextField label='Email' type='email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          </Grid>
          <Grid size={12}>
            <CustomTextField
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.target.value)}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(true)}
            />
          </Grid>
          <Grid size={12}>
            <CustomTextField label='Confirm Password' name='confirm' type='password' value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          style={{ marginTop: '20px' }}
        >
          Sign Up
        </Button>
      </form>
      {showPasswordRequirements && ( <PasswordRequirements passwordConditions={passwordConditions} />)}
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
    </MainLayout>
  );
};

export default Signup;
