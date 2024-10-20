import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Header />
      </MemoryRouter>
    );
  };

  it('renders the logo link', () => {
    renderWithRouter('/');
    const logoLink = screen.getByText(/easy generator/i);
    expect(logoLink).toBeInTheDocument();
  });

  it('shows "Sign Up" button when on the home page', () => {
    renderWithRouter('/');
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('shows "Log In" button when on the signup page', () => {
    renderWithRouter('/signup');
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

  it('hides "Sign Up" button when on the signup page', () => {
    renderWithRouter('/signup');
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
  });

  it('hides "Log In" button when on the login page', () => {
    renderWithRouter('/login');
    expect(screen.queryByText(/Log in/i)).not.toBeInTheDocument();
  });

  it('shows "Dashboard" button on all pages except the dashboard', () => {
    renderWithRouter('/');
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
