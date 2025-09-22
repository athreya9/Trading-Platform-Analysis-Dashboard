import React from 'react';
import type { Trade } from '../types';

interface RecentTradesProps {
  trades: Trade[];
  isLoading: boolean;
  error: string | null;
}

const RecentTrades: React.FC<RecentTradesProps> = ({ trades, isLoading, error }) => {

  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-profit"></div>
          </div>
      );
  }

  if (error) {
      return (
          <div className="text-center text-loss bg-loss/10 rounded-lg p-4">
              {error}
          </div>
      );
  }

  if (trades.length === 0) {
    return <div className="text-center text-gray-400 p-4">No recent trades found.</div>
  }

  return (
    <ul className="space-y-3">
      {trades.map((trade, index) => (
        <li key={index} className="grid grid-cols-4 items-center text-sm py-2 border-b border-white/5 last:border-b-0">
          <span className="font-bold">{trade.ticker}</span>
          <span className={`${trade.type === 'Buy' ? 'text-blue-400' : 'text-orange-400'}`}>{trade.type}</span>
          <span>{trade.price}</span>
          <span className={`text-right font-semibold ${trade.status === 'profit' ? 'text-profit' : 'text-loss'}`}>
            {trade.pnl}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RecentTrades;
