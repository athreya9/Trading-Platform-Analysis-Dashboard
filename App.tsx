// FINAL: Dashboard component integration
import React, { useState, useEffect } from 'react';
import { SystemControls } from './components/SystemControls';
import { fetchDashboardData } from './services/apiService';
import TradesTable from './components/TradesTable';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [systemStatus, setSystemStatus] = useState({
    botStatus: 'stopped',
    marketStatus: 'closed',
    nextTraining: 'Next Monday',
    lastSignal: ''
  });

  // Determine system status based on current time
  const determineSystemStatus = () => {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();
    
    // Simple market hours check (9:15 AM - 3:30 PM IST, Mon-Fri)
    const isMarketOpen = day >= 1 && day <= 5 && hours >= 9 && hours < 16;
    
    return {
      botStatus: isMarketOpen ? 'running' : 'stopped',
      marketStatus: isMarketOpen ? 'open' : 'closed',
      nextTraining: getNextTrainingDay(),
      lastSignal: getLastSignalTime()
    };
  };

  const getNextTrainingDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextMonday = days[(new Date().getDay() + 1) % 7];
    return `Next ${nextMonday}`;
  };

  const getLastSignalTime = () => {
    // This would come from your actual data
    return 'BANKNIFTY CE - 2 hours ago';
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        setSystemStatus(determineSystemStatus());
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    loadData();
    // Refresh every 60 seconds
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SystemControls 
        botStatus={systemStatus.botStatus}
        marketStatus={systemStatus.marketStatus}
        nextTraining={systemStatus.nextTraining}
        lastSignal={systemStatus.lastSignal}
      />

      {dashboardData && (
        <div>
          <TradesTable trades={dashboardData.trades} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;