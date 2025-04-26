// src/components/AppBar.js
import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';

const AppBar = ({ darkMode, setDarkMode }) => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bank Suspense Account Tracker
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="secondary"
            />
          }
          label="Dark Mode"
        />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
