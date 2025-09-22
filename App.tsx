
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import PerformanceChart from './components/PerformanceChart';
import RecentTrades from './components/RecentTrades';
import Card from './components/Card';
import AiSignals from './components/AiSignals';
import SystemControls from './components/SystemControls';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import ApiHealthCheck from './components/ApiHealthCheck';
import KiteAuthNotification from './components/KiteAuthNotification';
import { fetchDashboardData, handleKiteAuthCallback } from './services/apiService';
import type { Status, Trade } from './types';

const App: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [kiteAuthStatus, setKiteAuthStatus] = useState<'loading' | 'success' | 'error' | null>(null);
  const [kiteAuthMessage, setKiteAuthMessage] = useState<string | null>(null);

  useEffect(() => {
    const processUrlParams = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const requestToken = urlParams.get('request_token');
      const status = urlParams.get('status');

      if (requestToken && status === 'success') {
        setKiteAuthStatus('loading');
        setKiteAuthMessage('Processing KITE authentication...');
        try {
          const response = await handleKiteAuthCallback(requestToken);
          setKiteAuthStatus('success');
          setKiteAuthMessage(response.message);
        } catch (err: any) {
          setKiteAuthStatus('error');
          setKiteAuthMessage(err.message || 'KITE authentication failed.');
        } finally {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else if (status === 'error') {
          setKiteAuthStatus('error');
          setKiteAuthMessage('KITE authentication was cancelled or failed.');
          window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { statuses: fetchedStatuses, trades: fetchedTrades } = await fetchDashboardData();
        setStatuses(fetchedStatuses);
        setTrades(fetchedTrades);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data.');
        setStatuses([]); // Clear stale data on error
        setTrades([]);
      } finally {
        setIsLoading(false);
      }
    };

    processUrlParams().then(loadData);
  }, []);

  return (
    <div className="bg-background text-text-main min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header statuses={statuses} isLoading={isLoading} error={error && !isLoading ? "Failed to load system status" : null} />
        <KiteAuthNotification status={kiteAuthStatus} message={kiteAuthMessage} />

        <main className="grid grid-cols-12 gap-6 mt-6">
          {/* Main Content Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard title="Portfolio Value" value="$125,430.50" change="+$1,230.10 (1.2%)" changeType="profit" valueColor="profit" isLoading={isLoading} />
              <StatCard title="Day's P/L" value="-$450.75" change="-0.36%" changeType="loss" valueColor="loss" isLoading={isLoading} />
              <StatCard title="Active Trades" value="12" change="2 new" changeType="neutral" isLoading={isLoading} />
              <StatCard title="Win Rate" value="78%" change="+2% this week" changeType="profit" isLoading={isLoading} />
            </div>
            
            <PerformanceChart />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="AI Trading Signals">
                    <AiSignals />
                </Card>
                <Card title="System Controls">
                    <SystemControls />
                </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card title="Recent Trades">
              <RecentTrades trades={trades} isLoading={isLoading} error={error} />
            </Card>
            <Card title="System Architecture">
                <ArchitectureDiagram />
            </Card>
            <ApiHealthCheck />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
