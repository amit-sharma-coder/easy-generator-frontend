import React from 'react';
import { Grid2 as Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { IPasswordCondition } from './Signup.interface';

interface IPasswordRequirements {
  passwordConditions: IPasswordCondition
}

const PasswordRequirements: React.FC<IPasswordRequirements> = ({
  passwordConditions,
  ...props
}) => {
  return (
    <Grid mt={2}>
      <Typography variant='body2' color='textSecondary'>
        Password must contain:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary='At least 8 characters'
            style={{ color: (passwordConditions.length ? 'green' : 'red') }}
          />
          {passwordConditions.length ? <CheckIcon color='success' /> : null}
        </ListItem>
        <ListItem>
          <ListItemText
            primary='1 uppercase letter'
            style={{ color: (passwordConditions.uppercase ? 'green' : 'red') }}
          />
          {passwordConditions.uppercase ? <CheckIcon color='success' /> : null}
        </ListItem>
        <ListItem>
          <ListItemText
            primary='1 lowercase letter'
            style={{ color: (passwordConditions.lowercase ? 'green' : 'red') }}
          />
          {passwordConditions.lowercase ? <CheckIcon color='success' /> : null}
        </ListItem>
        <ListItem>
          <ListItemText
            primary='1 number'
            style={{ color: (passwordConditions.number ? 'green' : 'red') }}
          />
          {passwordConditions.number ? <CheckIcon color='success' /> : null}
        </ListItem>
        <ListItem>
          <ListItemText
            primary='1 special character (e.g., @$!%*?&)'
            style={{ color: (passwordConditions.specialChar ? 'green' : 'red') }}
          />
          {passwordConditions.specialChar ? <CheckIcon color='success' /> : null}
        </ListItem>
      </List>
    </Grid>
  );
};

export default PasswordRequirements;
