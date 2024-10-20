import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomTextField from '../CustomTextField';

describe('CustomTextField', () => {
  it('renders the text field with the correct label', () => {
    render(<CustomTextField label='Email' type='email' value='' />);
    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with the correct type', () => {
    render(<CustomTextField label='Password' type='password' value='' />);

    const inputElement = screen.getByLabelText(/password/i);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('displays the correct value', () => {
    render(<CustomTextField label='Username' type='text' value='testuser' />);

    const inputElement = screen.getByLabelText(/username/i) as HTMLInputElement;
    expect(inputElement.value).toBe('testuser');
  });

  it('calls onChange function when value changes', () => {
    const handleChange = jest.fn();
    render(<CustomTextField label='Email' type='email' value='' onChange={handleChange} />);

    const inputElement = screen.getByLabelText(/email/i);
    fireEvent.change(inputElement, { target: { value: 'newemail@example.com' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('is required', () => {
    render(<CustomTextField label='Email' type='email' value='' />);
    
    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toBeRequired();
  });
});
