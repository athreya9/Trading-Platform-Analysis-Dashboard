
import React from 'react';
import { Paper, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const OptionsGuide: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
        Options Trading Simplified
      </Typography>

      <Section title="1. What is an Option?">
        <Typography paragraph>
          An Option is a special type of financial contract. It gives the buyer the right, but not the obligation, to buy or sell something (like NIFTY or Bank NIFTY) at a fixed price on or before a certain date. To get this right, the buyer pays a fee called a <strong>premium</strong>.
        </Typography>
        <Typography paragraph>
          Think of it like booking a movie ticket: You pay ₹200 for the ticket (premium), you have the right to watch the movie (buy/sell). If you don’t go, your maximum loss is only ₹200.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="2. Two Types of Options">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Call Option (CE) → Right to BUY</Typography>
            <Typography>You buy a Call if you think the market will go <strong>up</strong>.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Put Option (PE) → Right to SELL</Typography>
            <Typography>You buy a Put if you think the market will go <strong>down</strong>.</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Simple memory trick:</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
            <TrendingUpIcon color="success" />
            <Typography sx={{ mx: 1 }}>Call = Bullish (Uptrend)</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
            <TrendingDownIcon color="error" />
            <Typography sx={{ mx: 1 }}>Put = Bearish (Downtrend)</Typography>
          </Box>
        </Box>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="3. Key Terms in Options">
        <List>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="Strike Price" secondary="The fixed price at which you can buy/sell (e.g., NIFTY 22,000 strike)." /></ListItem>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="Premium" secondary="The cost of buying the option (like your ticket fee)." /></ListItem>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="Expiry" secondary="The last date the option is valid (weekly expiry = every Thursday for NIFTY/BankNIFTY)." /></ListItem>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="Lot Size" secondary="You can’t buy just 1 NIFTY option; you must buy in lots (e.g., NIFTY lot = 25 units, BankNIFTY lot = 15 units, but these change)." /></ListItem>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="ATM (At The Money)" secondary="Strike price closest to current market price." /></ListItem>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="OTM (Out of The Money)" secondary="Strike price away from current market price." /></ListItem>
          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary="ITM (In The Money)" secondary="Strike price already favorable compared to current price." /></ListItem>
        </List>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="Visual Guide">
        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Market UP</Typography>
              <ArrowForwardIcon sx={{ my: 1 }} />
              <Typography variant="h6" color="success.main">Buy Call (CE)</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Market DOWN</Typography>
              <ArrowForwardIcon sx={{ my: 1 }} />
              <Typography variant="h6" color="error.main">Buy Put (PE)</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Section>

    </Paper>
  );
};

export default OptionsGuide;
