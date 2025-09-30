import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Grid, CircularProgress, Typography, Paper, Box } from '@mui/material';
import Header from './components/Header';
import TradesTable from './components/TradesTable';
import { fetchDashboardData } from './services/apiService';
import TradingSignals from './components/TradingSignals';
import { SystemControls } from './components/SystemControls';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FFFF', // Neon Cyan for primary actions/highlights
    },
    secondary: {
      main: '#FF00FF', // Neon Magenta for secondary actions/accents
    },
    background: {
      default: '#1F1F1F', // Dark background
      paper: '#2C2C2C',   // Slightly lighter for cards/surfaces
    },
    text: {
      primary: '#E0E0E0', // Light grey for main text
      secondary: '#B0B0B0', // Slightly darker grey for secondary text
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
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

  const liveSignals = dashboardData?.signals?.filter((s: any) => s.status === "live");
  const marketStatus = liveSignals && liveSignals.length > 0 ? 'open' : 'closed';
  const lastSignal = liveSignals && liveSignals.length > 0 ? `${liveSignals[0].instrument} - ${liveSignals[0].signal}` : 'N/A';

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <SystemControls
              marketStatus={marketStatus}
              nextTraining={"Next Sunday"}
              lastSignal={lastSignal}
            />
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
          <Grid item xs={12}>
             {liveSignals && liveSignals.length > 0 ? (
              <TradingSignals signals={liveSignals} />
            ) : (
              <Paper elevation={3} sx={{ p: 3, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6">No Live Signals</Typography>
                <Typography variant="body2" color="text.secondary">
                  No live signals available. Market may be closed or in dry-run mode.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;