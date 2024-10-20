/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import PasswordRequirements from '../PasswordRequirements';
import { IPasswordCondition } from '../Signup.interface';

const mockConditions = (conditions: Partial<IPasswordCondition>): IPasswordCondition => ({
  length: conditions.length ?? false,
  uppercase: conditions.uppercase ?? false,
  lowercase: conditions.lowercase ?? false,
  number: conditions.number ?? false,
  specialChar: conditions.specialChar ?? false,
});

describe('PasswordRequirements Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PasswordRequirements passwordConditions={mockConditions({})} />);
    expect(screen.getByText(/Password must contain/i)).toBeInTheDocument();
  });

  it('shows correct text and color for each requirement based on conditions', () => {
    render(
      <PasswordRequirements passwordConditions={mockConditions({
        length: true,
        uppercase: false,
        lowercase: true,
        number: false,
        specialChar: true,
      })} />
    );

    const conditions = [
      { text: 'At least 8 characters', met: true },
      { text: '1 uppercase letter', met: false },
      { text: '1 lowercase letter', met: true },
      { text: '1 number', met: false },
      { text: '1 special character (e.g., @$!%*?&)', met: true },
    ];

    conditions.forEach(({ text, met }) => {
      const listItem = screen.getByText(text).closest('div');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveStyle(`color: ${met ? 'green' : 'red'}`);
    });
  });

  it('shows CheckIcon for met conditions', () => {
    render(
      <PasswordRequirements passwordConditions={mockConditions({
        length: true,
        uppercase: true,
        lowercase: false,
        number: false,
        specialChar: true,
      })} />
    );

    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 number')).toBeInTheDocument();
    expect(screen.getByText('1 special character (e.g., @$!%*?&)')).toBeInTheDocument();

    const checkIcons = screen.getAllByTestId('CheckIcon');
    expect(checkIcons.length).toEqual(3);
  });

  it('displays all requirements when all conditions are false', () => {
    render(<PasswordRequirements passwordConditions={mockConditions({})} />);

    const conditions = [
      { text: 'At least 8 characters', met: false },
      { text: '1 uppercase letter', met: false },
      { text: '1 lowercase letter', met: false },
      { text: '1 number', met: false },
      { text: '1 special character (e.g., @$!%*?&)', met: false },
    ];

    conditions.forEach(({ text, met }) => {
      const listItem = screen.getByText(text).closest('div');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveStyle({ color : 'red' });
    });
  });
});
