import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { useAuth } from '../../Auth/AuthContext';

jest.mock('../../Auth/AuthContext');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Dashboard Component', () => {
  const mockLogout = jest.fn();
  const mockName = 'Test User';

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      name: mockName,
    });
  });

  const renderDashboard = () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  };

  it('renders the Dashboard with welcome message', () => {
    renderDashboard();
    
    const welcomeMessage = screen.getByText(/welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the Log Out button', () => {
    renderDashboard();
    
    const logoutButton = screen.getByRole('button', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls logout and navigates to login on Log Out button click', async () => {
    renderDashboard();
    const logoutButton = screen.getByRole('button', { name: /log out/i });

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
