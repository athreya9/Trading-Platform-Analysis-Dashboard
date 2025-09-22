
import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../services/apiService';

const ApiHealthCheck: React.FC = () => {
  const [isApiHealthy, setIsApiHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyApiHealth = async () => {
      try {
        const response = await checkApiHealth();
        setIsApiHealthy(response.status === 'ok');
      } catch (error) {
        setIsApiHealthy(false);
        console.error('API health check failed:', error);
      }
    };

    const timer = setTimeout(verifyApiHealth, 1000); // Delay check slightly
    return () => clearTimeout(timer);
  }, []);

  if (isApiHealthy === null) {
    return (
        <div className="p-3 rounded-lg text-sm text-center text-gray-400">
            Checking API status...
        </div>
    );
  }
  
  const healthStatus = isApiHealthy 
    ? { text: 'API Connection Healthy', color: 'text-profit', bgColor: 'bg-profit/10', borderColor: 'border-profit/30' }
    : { text: 'API Connection Error', color: 'text-loss', bgColor: 'bg-loss/10', borderColor: 'border-loss/30' };
  
  return (
    <div className={`p-3 rounded-lg text-sm text-center border ${healthStatus.color} ${healthStatus.bgColor} ${healthStatus.borderColor}`}>
      {healthStatus.text}
    </div>
  );
};

export default ApiHealthCheck;
