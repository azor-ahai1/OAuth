import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { logout, selectUser } from '../store/authSlice.js';

export const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h1 className="text-xl font-medium text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">
            Manage your account information and settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <p className="text-gray-900 font-medium">{user.name}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <p className="text-gray-900 font-medium">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Verified</label>
              <div className="flex items-center gap-2">
                {user.isEmailVerified ? (
                  <>
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-green-600 text-sm font-medium">Verified</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500 text-sm" />
                    <span className="text-red-600 text-sm font-medium">Not Verified</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Account Created</label>
              <p className="text-gray-900 font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3 text-red-600 border border-red-200 rounded font-medium hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
