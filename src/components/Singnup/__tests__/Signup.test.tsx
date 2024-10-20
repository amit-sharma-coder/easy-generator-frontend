/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../Singup';
import axios from 'axios';

jest.mock('axios');

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Signup />);
    const signupText = screen.getAllByText(/Sign Up/i);
    expect(signupText.length).toEqual(2);
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('displays error message for mismatched passwords', async () => {
    const { container } = render(<Signup />);
      
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });

    const password = container.querySelector('input[type="password"]')!;
    fireEvent.change(password, { target: { value: 'StrongPass1!' } });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'DifferentPass1!' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match!/i)).toBeInTheDocument();
    });
  });

  it('displays error message for weak password', async () => {
    const { container } = render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    const password = container.querySelector('input[type="password"]')!;
    fireEvent.change(password, { target: { value: 'weak' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'weak' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password does not meet the strength requirements/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { message: 'Signup successful!' } });

    const { container } = render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    const password = container.querySelector('input[type="password"]')!;
    fireEvent.change(password, { target: { value: 'StrongPass1!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'StrongPass1!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Signup successful!/i)).toBeInTheDocument();
    });
  });

  it('displays error message on signup failure', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Signup failed. Please try again.' } },
    });

    const { container } = render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    const password = container.querySelector('input[type="password"]')!;
    fireEvent.change(password, { target: { value: 'StrongPass1!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'StrongPass1!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Signup failed. Please try again/i)).toBeInTheDocument();
    });
  });

  it('shows password requirements when focusing on password field', () => {
    const { container } = render(<Signup />);

    const password = container.querySelector('input[type="password"]')!;
    fireEvent.focus(password);
    expect(screen.getByText(/Password must contain/i)).toBeInTheDocument();
  });
});
