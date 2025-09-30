import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Grid, CircularProgress, Typography } from '@mui/material';
import Header from './components/Header';
import { SystemControls } from './components/SystemControls';
import TradesTable from './components/TradesTable';
import { fetchDashboardData } from './services/apiService';
import TradingSignals from './components/TradingSignals';

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

  const getSystemStatus = () => {
    if (!dashboardData) {
      return {
        botStatus: 'stopped',
        marketStatus: 'closed',
        nextTraining: 'N/A',
        lastSignal: 'N/A'
      };
    }
    const botStatus = dashboardData.statuses.find(s => s.name === 'Trading Bot')?.status === 'connected' ? 'running' : 'stopped';
    const marketStatus = dashboardData.statuses.find(s => s.name === 'Data Source')?.status === 'connected' ? 'open' : 'closed';
    return {
      botStatus,
      marketStatus,
      nextTraining: 'Next Sunday', // This can be made dynamic later
      lastSignal: dashboardData.trades.length > 0 ? `${dashboardData.trades[0].ticker} - ${dashboardData.trades[0].type}` : 'N/A'
    };
  };

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

  const systemStatus = getSystemStatus();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <SystemControls
              botStatus={systemStatus.botStatus}
              marketStatus={systemStatus.marketStatus}
              nextTraining={systemStatus.nextTraining}
              lastSignal={systemStatus.lastSignal}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            {dashboardData && dashboardData.trades.length > 0 ? (
              <TradesTable trades={dashboardData.trades} />
            ) : (
              <Typography>No trade data available.</Typography>
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