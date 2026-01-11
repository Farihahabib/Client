import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

const ApiTest = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setApiUrl(import.meta.env.VITE_API_URL || 'Not set');
  }, []);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      setTestResult(`✅ Success! Got ${response.data.length} reviews`);
    } catch (error) {
      setTestResult(`❌ Error: ${error.message}`);
      console.error('API Test Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">API Connection Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Current API URL:</p>
        <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
          {apiUrl}
        </p>
      </div>

      <button 
        onClick={testConnection}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      {testResult && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-sm">{testResult}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;