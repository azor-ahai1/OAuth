import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { authAPI } from '../utils/api.js';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
      return;
    }

    const verify = async () => {
      try {
        await authAPI.verifyEmail({ token });
        setStatus('success');
        setMessage('Your email has been successfully verified! You can now log in.');
      } catch (err) {
        setStatus('error');
        setMessage(
          err.response?.data?.message || 'Verification failed. The link may have expired or is invalid.'
        );
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-sm border p-8 max-w-sm w-full text-center">
        {status === 'loading' && (
          <>
            <FaSpinner className="mx-auto text-4xl text-gray-600 animate-spin mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Verifying Email</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-4" />
            <h2 className="text-lg font-medium text-green-600 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
            >
              Go to Login
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <FaTimesCircle className="mx-auto text-4xl text-red-500 mb-4" />
            <h2 className="text-lg font-medium text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
            >
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;