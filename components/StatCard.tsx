import React from 'react';

interface StatCardProps {
  title?: string;
  value?: string;
  change?: string;
  changeType?: 'profit' | 'loss' | 'neutral';
  valueColor?: 'profit' | 'loss';
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, valueColor, isLoading }) => {
  if (isLoading) {
      return (
          <div className="bg-gradient-to-br from-primary to-accent p-5 rounded-xl text-center shadow-lg animate-pulse">
              <div className="h-5 bg-gray-600 rounded w-3/4 mx-auto"></div>
              <div className="h-8 bg-gray-500 rounded w-1/2 mx-auto my-3"></div>
              <div className="h-5 bg-gray-600 rounded w-1/3 mx-auto"></div>
          </div>
      );
  }

  const changeColorClasses = {
    profit: 'text-profit',
    loss: 'text-loss',
    neutral: 'text-gray-400',
  };
  
  const valueColorClasses = {
    profit: 'text-profit',
    loss: 'text-loss',
  };

  return (
    <div className="bg-gradient-to-br from-primary to-accent p-5 rounded-xl text-center shadow-lg transition-transform hover:scale-105 duration-300">
      <div className="text-gray-300">{title}</div>
      <div className={`text-3xl font-bold my-2 ${valueColor ? valueColorClasses[valueColor] : ''}`}>
        {value}
      </div>
      <div className={`${changeType ? changeColorClasses[changeType] : ''}`}>
        {change}
      </div>
    </div>
  );
};

export default StatCard;
