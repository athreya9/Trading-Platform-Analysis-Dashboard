import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip, Grid, CircularProgress, Button, ButtonGroup } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

interface SystemControlsProps {
  marketStatus: string | null;
  nextTraining: string;
  lastSignal: string;
}

const StatusItem: React.FC<{ icon: React.ReactNode; label: string; value: string; chipLabel?: string; chipColor?: any }> = ({ icon, label, value, chipLabel, chipColor }) => (
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
    {chipLabel && <Chip label={chipLabel} color={chipColor} variant="filled" />}
  </Box>
);

const MarketStatus: React.FC<{ status: string | null }> = ({ status }) => {
  if (status === null) {
    return <StatusItem icon={<CircularProgress size={24} />} label="Market Status" value="Loading..." />;
  }

  if (status === 'unavailable') {
    return <StatusItem icon={<AccessTimeIcon color="error" />} label="Market Status" value="Status unavailable" chipLabel="ERROR" chipColor="error" />;
  }

  const isOpen = status === 'open';
  return (
    <StatusItem
      icon={<AccessTimeIcon color="primary" />}
      label="Market Status"
      value={isOpen ? 'Market open - Live trading enabled' : 'Market closed - Data collection active'}
      chipLabel={isOpen ? 'OPEN' : 'CLOSED'}
      chipColor={isOpen ? 'success' : 'info'}
    />
  );
};

export const SystemControls: React.FC<SystemControlsProps> = ({
  marketStatus,
  nextTraining,
  lastSignal
}) => {
  const [botStatus, setBotStatus] = useState('Stopped');
  const [isLoading, setIsLoading] = useState(true);

  const fetchBotStatus = async () => {
    try {
      const response = await fetch('/api/bot/status');
      const data = await response.json();
      setBotStatus(data.status);
    } catch (error) {
      console.error('Error fetching bot status:', error);
      setBotStatus('Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBotStatus();
    const interval = setInterval(fetchBotStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleStartBot = async () => {
    try {
      await fetch('/api/bot/start', { method: 'POST' });
      fetchBotStatus();
    } catch (error) {
      console.error('Error starting bot:', error);
    }
  };

  const handleStopBot = async () => {
    try {
      await fetch('/api/bot/stop', { method: 'POST' });
      fetchBotStatus();
    } catch (error) {
      console.error('Error stopping bot:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        System Status
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
            <AutoAwesomeIcon color="primary" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight="medium">
                Trading Bot
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isLoading ? 'Loading...' : botStatus === 'Running' ? 'Active - Scanning markets' : 'Paused - Waiting for market hours'}
              </Typography>
            </Box>
            {isLoading ? <CircularProgress size={24} /> : (
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={handleStartBot} disabled={botStatus === 'Running'}>
                  <PlayArrowIcon />
                  Start
                </Button>
                <Button onClick={handleStopBot} disabled={botStatus !== 'Running'}>
                  <StopIcon />
                  Stop
                </Button>
              </ButtonGroup>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <MarketStatus status={marketStatus} />
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