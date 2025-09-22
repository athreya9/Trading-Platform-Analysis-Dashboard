import React, { useState } from 'react';
import { postControlAction, initiateKiteLogin } from '../services/apiService';

type ControlStatus = 'idle' | 'loading' | 'success' | 'error';

const SystemControls: React.FC = () => {
  const [controlStatus, setControlStatus] = useState<ControlStatus>('idle');
  const [controlMessage, setControlMessage] = useState<string>('');
  const [kiteStatus, setKiteStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [kiteMessage, setKiteMessage] = useState<string>('');

  const handleControlClick = async (action: string) => {
    setControlStatus('loading');
    setControlMessage('');
    setKiteStatus('idle'); // reset other statuses
    setKiteMessage('');
    try {
      const response = await postControlAction(action);
      setControlStatus('success');
      setControlMessage(response.message || `Action '${action}' successful.`);
    } catch (err: any) {
      setControlStatus('error');
      setControlMessage(err.message || `Action '${action}' failed.`);
    }
  };
  
  const handleKiteConnect = async () => {
    setKiteStatus('loading');
    setKiteMessage('');
    setControlStatus('idle'); // reset other statuses
    setControlMessage('');
    try {
      await initiateKiteLogin();
      // The page will redirect, so no success state is needed on the frontend.
    } catch (err: any) {
      setKiteStatus('error');
      setKiteMessage(err.message || 'Failed to initiate KITE connection.');
    }
  };


  const ControlButton: React.FC<{ action: string; label: string; color: string }> = ({ action, label, color }) => (
    <button
      onClick={() => handleControlClick(action)}
      disabled={controlStatus === 'loading'}
      className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${color}`}
    >
      {controlStatus === 'loading' ? 'Processing...' : label}
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleKiteConnect}
          disabled={kiteStatus === 'loading'}
          className="w-full text-white font-bold py-2 px-4 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-600/90"
        >
          {kiteStatus === 'loading' ? 'Redirecting...' : 'Connect KITE API'}
        </button>
        <ControlButton action="start_bot" label="Start Trading Bot" color="bg-profit hover:bg-profit/90" />
        <ControlButton action="stop_bot" label="Stop Trading Bot" color="bg-loss hover:bg-loss/90" />
        <ControlButton action="restart_services" label="Restart Services" color="bg-warning hover:bg-warning/90" />
      </div>
      
      {(controlStatus !== 'idle' || kiteStatus === 'error') && (
        <div className="mt-4 text-center text-sm p-3 rounded-lg">
          {controlStatus === 'loading' && <p>Processing action...</p>}
          {controlStatus === 'success' && <p className="text-profit">{controlMessage}</p>}
          {controlStatus === 'error' && <p className="text-loss">{controlMessage}</p>}
          {kiteStatus === 'error' && <p className="text-loss">{kiteMessage}</p>}
        </div>
      )}

      <div className="mt-4 bg-primary p-4 rounded-lg border border-white/10">
          <h4 className="font-semibold text-warning">Authentication Help</h4>
          <p className="text-sm text-gray-300 mt-1">
              If the KITE API status is disconnected or shows an error, use the "Connect KITE API" button to re-authenticate. This will redirect you to the official KITE login page to securely authorize the connection.
          </p>
      </div>
    </div>
  );
};

export default SystemControls;
