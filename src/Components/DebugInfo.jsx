import { useState, useEffect } from 'preact/hooks';

const DebugInfo = () => {
  const [envInfo, setEnvInfo] = useState({});

  useEffect(() => {
    setEnvInfo({
      apiUrl: import.meta.env.VITE_API_URL,
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      allEnvVars: import.meta.env
    });
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Debug Info</h4>
      <div className="space-y-1">
        <div><strong>API URL:</strong> {envInfo.apiUrl || 'Not set'}</div>
        <div><strong>Mode:</strong> {envInfo.mode}</div>
        <div><strong>Environment:</strong> {envInfo.dev ? 'Development' : 'Production'}</div>
        <div><strong>Current URL:</strong> {window.location.href}</div>
      </div>
    </div>
  );
};

export default DebugInfo;