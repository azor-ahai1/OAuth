import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaGoogle
} from 'react-icons/fa';
import { selectUserAuth, selectUser } from '../store/authSlice.js';

export const Home = () => {
  const userAuth = useSelector(selectUserAuth);
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-light mb-4 text-gray-800">
            UncleFab
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple authentication system with email/password and OAuth login
          </p>
          
          {userAuth ? (
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto border">
              <FaCheckCircle className="mx-auto text-3xl text-green-500 mb-4" />
              <h2 className="text-xl font-medium mb-2">Welcome back</h2>
              <p className="text-gray-600 mb-6">
                Logged in as <span className="font-medium text-gray-900">{user?.name}</span>
              </p>
              <div className="space-y-3">
                <Link 
                  to="/profile" 
                  className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
                >
                  View Profile
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link 
                  to="/shop" 
                  className="flex items-center justify-center gap-2 w-full px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                >
                  Browse Shop
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-xs mx-auto">
              <Link 
                to="/signup" 
                className="flex items-center justify-center gap-2 w-full px-8 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
              >
                Get Started
                <FaArrowRight className="text-sm" />
              </Link>
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 w-full px-8 py-3 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="text-center p-6">
            <FaShieldAlt className="mx-auto text-3xl text-gray-700 mb-4" />
            <h3 className="text-lg font-medium mb-2">Email & Password</h3>
            <p className="text-gray-600 text-sm">
              Traditional authentication with email verification
            </p>
          </div>
          <div className="text-center p-6">
            <FaGoogle className="mx-auto text-3xl text-gray-700 mb-4" />
            <h3 className="text-lg font-medium mb-2">Google OAuth</h3>
            <p className="text-gray-600 text-sm">
              One-click login with your Google account
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;