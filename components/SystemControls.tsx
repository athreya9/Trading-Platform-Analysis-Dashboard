// FINAL: components/SystemControls.tsx
import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';

interface SystemControlsProps {
  botStatus: string;
  marketStatus: string;
  nextTraining: string;
  lastSignal: string;
}

export const SystemControls: React.FC<SystemControlsProps> = ({ 
  botStatus, 
  marketStatus, 
  nextTraining,
  lastSignal 
}) => {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'success';
      case 'stopped': return 'default';
      case 'market_closed': return 'info';
      default: return 'warning';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
         AI Trading System - Autonomous Operation
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Trading Bot Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AutoAwesomeIcon color="primary" sx={{ fontSize: 30 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              Trading Bot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {botStatus === 'running' 
                ? ' Active - Scanning markets in real-time' 
                : '⏸️ Paused - Waiting for market hours'}
            </Typography>
          </Box>
          <Chip 
            label={botStatus === 'running' ? 'LIVE' : 'PAUSED'} 
            color={getStatusColor(botStatus)}
            variant="filled"
          />
        </Box>

        {/* Market Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccessTimeIcon color="primary" sx={{ fontSize: 30 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              Market Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {marketStatus === 'open' 
                ? ' Market open - Live trading enabled' 
                : ' Market closed - Data collection active'}
            </Typography>
          </Box>
          <Chip 
            label={marketStatus === 'open' ? 'OPEN' : 'CLOSED'} 
            color={marketStatus === 'open' ? 'success' : 'info'}
            variant="outlined"
          />
        </Box>

        {/* AI Training Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PsychologyIcon color="secondary" sx={{ fontSize: 30 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              AI Learning Engine
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Next training: {nextTraining}
            </Typography>
          </Box>
          <Chip 
            label="AUTO-LEARN" 
            color="secondary"
            size="small"
          />
        </Box>

        {/* Last Signal Info */}
        {lastSignal && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            p: 2,
            bgcolor: 'success.light',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'success.main'
          }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'medium' }}>
               Last Signal: {lastSignal}
            </Typography>
          </Box>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', fontStyle: 'italic' }}>
         Fully autonomous system • Market-hour aware • Self-training AI • No manual intervention needed
      </Typography>
    </Paper>
  );
};