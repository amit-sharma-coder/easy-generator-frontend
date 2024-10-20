import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import axios from 'axios';

jest.mock('axios');

const TestComponent = () => {
  const { isAuthenticated, name, login, logout, checkAuth } = useAuth();
  return (
    <>
      <div data-testid="isAuthenticated">{isAuthenticated.toString()}</div>
      <div data-testid="name">{name}</div>
      <button onClick={() => login('mockToken')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => checkAuth()}>Check Auth</button>
    </>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithAuthProvider = () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  };

  it('initial state is not authenticated', () => {
    renderWithAuthProvider();
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('name')).toHaveTextContent('');
  });

  it('login updates authentication state', () => {
    renderWithAuthProvider();
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    expect(localStorage.getItem('token')).toBe('mockToken');
  });

  it('logout clears authentication state', () => {
    renderWithAuthProvider();
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('name')).toHaveTextContent('');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('calls checkAuth to check for the authentication', async () => {
    localStorage.setItem('token', 'mockToken');
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: { name: 'Test User' } } });
    
    renderWithAuthProvider();
    fireEvent.click(screen.getByRole('button', { name: /check auth/i }));

    await waitFor(() => {
      expect(screen.queryByTestId('isAuthenticated')).toHaveTextContent('true');
    });

    await waitFor(() => {
        expect(screen.queryByTestId('name')).toHaveTextContent('Test User');
    });
  });

  it('checkAuth handles errors', async () => {
    localStorage.setItem('token', 'mockToken');
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    renderWithAuthProvider();
    
    fireEvent.click(screen.getByRole('button', { name: /check auth/i }));

    await waitFor(() => {
      expect(screen.queryByTestId('isAuthenticated')).toHaveTextContent('false');
    });

    await waitFor(() => {
      expect(screen.queryByTestId('name')).toHaveTextContent('');
    });
  });
});
