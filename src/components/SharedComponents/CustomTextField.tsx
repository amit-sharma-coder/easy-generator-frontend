import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  label: string;
  type: string;
  value: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  type,
  value,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      variant='outlined'
      label={label}
      type={type}
      value={value}
      required
      {...props}
    />
  );
};

export default CustomTextField;
