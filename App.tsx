import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Grid, CircularProgress, Typography, Paper, Box, Chip } from '@mui/material';
import Header from './components/Header';
import TradesTable from './components/TradesTable';
import { fetchDashboardData } from './services/apiService';
import TradingSignals from './components/TradingSignals';
import { AccessTime, AutoAwesome, Psychology, SignalCellularAlt } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4ecca3',
    },
    secondary: {
      main: '#ff9a3d',
    },
    background: {
      default: '#0d0d1a',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
});

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

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography color="error">{error}</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  const botStatus = dashboardData?.statuses?.find(s => s.name === 'Trading Bot')?.status === 'connected' ? 'running' : 'stopped';
  const marketStatus = dashboardData?.signals?.length > 0 ? 'open' : 'closed'; // A simple heuristic
  const lastSignal = dashboardData?.signals?.length > 0 ? `${dashboardData.signals[0].instrument} - ${dashboardData.signals[0].signal}` : 'N/A';

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                System Status
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StatusItem
                    icon={<AutoAwesome color="primary" />}
                    label="Trading Bot"
                    value={botStatus === 'running' ? 'Active - Scanning markets' : 'Stopped'}
                    chipLabel={botStatus === 'running' ? 'LIVE' : 'PAUSED'}
                    chipColor={botStatus === 'running' ? 'success' : 'default'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StatusItem
                    icon={<AccessTime color="primary" />}
                    label="Market Status"
                    value={marketStatus === 'open' ? 'Market open - Live signals available' : 'Market closed'}
                    chipLabel={marketStatus === 'open' ? 'OPEN' : 'CLOSED'}
                    chipColor={marketStatus === 'open' ? 'success' : 'info'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StatusItem
                    icon={<Psychology color="secondary" />}
                    label="AI Learning Engine"
                    value={"Next training: Next Sunday"}
                    chipLabel="AUTO-LEARN"
                    chipColor="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StatusItem
                    icon={<SignalCellularAlt color="primary" />}
                    label="Last Signal"
                    value={lastSignal}
                    chipLabel="RECENT"
                    chipColor="primary"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            {dashboardData && dashboardData.trades && dashboardData.trades.length > 0 ? (
              <TradesTable trades={dashboardData.trades} />
            ) : (
              <Paper elevation={3} sx={{ p: 3, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6">No Recent Trades</Typography>
                <Typography variant="body2" color="text.secondary">The trade log is currently empty.</Typography>
              </Paper>
            )}
          </Grid>
          {dashboardData && dashboardData.signals && (
            <Grid item xs={12}>
              <TradingSignals signals={dashboardData.signals} />
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;