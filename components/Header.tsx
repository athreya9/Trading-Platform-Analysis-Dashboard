import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb'; // A simple, tech-y icon for the logo

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AdbIcon sx={{ mr: 2, color: '#4ecca3' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#eeeeee' }}>
            DA AI Trading Platform
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;