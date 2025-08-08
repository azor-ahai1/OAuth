import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FaHome, 
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaHeart
} from 'react-icons/fa';
import { logout, selectUserAuth, selectUser } from '../store/authSlice.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuth = useSelector(selectUserAuth);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { to: '/', icon: <FaHome />, label: 'Home' },
    { to: '/shop', icon: <FaShoppingBag />, label: 'Shop' },
    ...(userAuth ? [{
      to: `/profile`, 
      icon: <FaUser />, 
      label: 'Profile'
    }] : []),
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-light text-gray-900">UncleFab</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center ml-25 space-x-6">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.to}
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 transition-colors"
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {!userAuth ? (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 flex items-center space-x-2 transition-colors"
            >
              <FaSignOutAlt className="text-xs" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;