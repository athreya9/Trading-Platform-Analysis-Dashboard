import React from 'react';

interface KiteAuthNotificationProps {
  status?: 'loading' | 'success' | 'error' | null;
  message?: string | null;
}

const KiteAuthNotification: React.FC<KiteAuthNotificationProps> = ({ status, message }) => {
  if (!status || !message) {
    return null;
  }

  const baseClasses = 'p-4 rounded-md my-4 text-sm flex items-center justify-center';
  const statusClasses = {
    loading: 'bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-300/90',
    success: 'bg-profit/10 border-l-4 border-profit text-profit/90',
    error: 'bg-loss/10 border-l-4 border-loss text-loss/90',
  };

  return (
    <div className={`${baseClasses} ${statusClasses[status]}`}>
      {status === 'loading' && (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-300 mr-3"></div>
      )}
      <strong>KITE Authentication:</strong><span className="ml-2">{message}</span>
    </div>
  );
};

export default KiteAuthNotification;