// src/App.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SuspenseTable from './components/SuspenseTable';
import AppBar from './components/AppBar';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#2E7D32' : '#4CAF50',
      },
      secondary: {
        main: '#388E3C',
      },
      background: {
        default: darkMode ? '#121212' : '#E8F5E9',
        paper: darkMode ? '#1E1E1E' : '#C8E6C9',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <SuspenseTable />
      </div>
    </ThemeProvider>
  );
};

export default App;
