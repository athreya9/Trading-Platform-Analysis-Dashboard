import React from 'react';
import { Paper, Typography, Box, Chip, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface SystemControlsProps {
  botStatus: string;
  marketStatus: string;
  nextTraining: string;
  lastSignal: string;
}

const StatusItem: React.FC<{ icon: React.ReactNode; label: string; value: string; chipLabel: string; chipColor: any }> = ({ icon, label, value, chipLabel, chipColor }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
    {icon}
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" fontWeight="medium">
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Box>
    <Chip label={chipLabel} color={chipColor} variant="filled" />
  </Box>
);

export const SystemControls: React.FC<SystemControlsProps> = ({
  botStatus,
  marketStatus,
  nextTraining,
  lastSignal
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        System Status
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StatusItem
            icon={<AutoAwesomeIcon color="primary" />}
            label="Trading Bot"
            value={botStatus === 'running' ? 'Active - Scanning markets' : 'Paused - Waiting for market hours'}
            chipLabel={botStatus === 'running' ? 'LIVE' : 'PAUSED'}
            chipColor={botStatus === 'running' ? 'success' : 'default'}
          />
        </Grid>
        <Grid item xs={12}>
          <StatusItem
            icon={<AccessTimeIcon color="primary" />}
            label="Market Status"
            value={marketStatus === 'open' ? 'Market open - Live trading enabled' : 'Market closed - Data collection active'}
            chipLabel={marketStatus === 'open' ? 'OPEN' : 'CLOSED'}
            chipColor={marketStatus === 'open' ? 'success' : 'info'}
          />
        </Grid>
        <Grid item xs={12}>
          <StatusItem
            icon={<PsychologyIcon color="secondary" />}
            label="AI Learning Engine"
            value={`Next training: ${nextTraining}`}
            chipLabel="AUTO-LEARN"
            chipColor="secondary"
          />
        </Grid>
        {lastSignal && (
          <Grid item xs={12}>
            <StatusItem
              icon={<SignalCellularAltIcon color="primary" />}
              label="Last Signal"
              value={lastSignal}
              chipLabel="RECENT"
              chipColor="primary"
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};