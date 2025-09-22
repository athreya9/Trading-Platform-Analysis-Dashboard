import React from 'react';
import type { Status, StatusType } from '../types';

interface HeaderProps {
  statuses: Status[];
  isLoading: boolean;
  error: string | null;
}

const StatusDot: React.FC<{ status: StatusType }> = ({ status }) => {
  const colorClasses = {
    connected: 'bg-profit shadow-[0_0_10px_theme(colors.profit)]',
    disconnected: 'bg-loss shadow-[0_0_10px_theme(colors.loss)]',
    warning: 'bg-warning shadow-[0_0_10px_theme(colors.warning)]',
  };

  return <div className={`w-4 h-4 rounded-full mb-1 ${colorClasses[status]}`}></div>;
};

const StatusItemSkeleton: React.FC = () => (
    <div className="flex flex-col items-center animate-pulse">
        <div className="w-4 h-4 rounded-full mb-1 bg-gray-600"></div>
        <div className="h-4 w-16 bg-gray-600 rounded"></div>
    </div>
);

const Header: React.FC<HeaderProps> = ({ statuses, isLoading, error }) => {
  return (
    <header className="bg-gradient-to-r from-primary to-accent p-5 rounded-xl shadow-2xl flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-profit mb-4 sm:mb-0">
        Trading Platform
      </h1>
      <div className="flex gap-4 sm:gap-6">
        {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <StatusItemSkeleton key={i} />)
        ) : error ? (
            <span className="text-loss text-sm">{error}</span>
        ) : (
          statuses.map(({ name, status }) => (
            <div key={name} className="flex flex-col items-center">
              <StatusDot status={status} />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))
        )}
      </div>
    </header>
  );
};

export default Header;
