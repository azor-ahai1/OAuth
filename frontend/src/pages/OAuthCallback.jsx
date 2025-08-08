import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { login, setError } from '../store/authSlice.js';
import { authAPI } from '../utils/api.js';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          dispatch(setError('Authentication failed. Please try again.'));
          setStatus('error');
          setMessage('Authentication failed');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        if (!accessToken || !refreshToken) {
          dispatch(setError('Authentication incomplete. Missing tokens.'));
          setStatus('error');
          setMessage('Authentication incomplete');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        localStorage.setItem('refreshToken', refreshToken);
        setMessage('Getting user information...');
        
        localStorage.setItem('token', accessToken);
        
        const userResponse = await authAPI.getCurrentUser();
        
        if (userResponse.success) {
          dispatch(login({
            user: userResponse.data,
            accessToken: accessToken
          }));
          
          setStatus('success');
          setMessage('Login successful!');
          
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          throw new Error('Failed to get user information');
        }

      } catch (error) {
        console.error('OAuth callback error:', error);
        dispatch(setError(error.message || 'Authentication failed'));
        setStatus('error');
        setMessage('Authentication failed');
        
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-sm border p-8 max-w-sm w-full text-center">
        {status === 'processing' && (
          <>
            <FaSpinner className="mx-auto text-4xl text-gray-600 animate-spin mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Please Wait</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Welcome!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-green-600 text-sm">Redirecting...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <FaTimesCircle className="mx-auto text-4xl text-red-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-red-600 text-sm">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;