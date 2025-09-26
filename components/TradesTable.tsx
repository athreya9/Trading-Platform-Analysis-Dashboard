import React from 'react';
import { Trade } from '../types';

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  if (!trades || trades.length === 0) {
    return <p>No trades to display.</p>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recent Trades</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ticker</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>P/L</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{trade.ticker}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{trade.type}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{trade.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{trade.pnl}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', color: trade.status === 'profit' ? 'green' : 'red' }}>{trade.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradesTable;