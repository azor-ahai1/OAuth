import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { selectUserAuth } from '../store/authSlice.js';

export const Shop = () => {
  const userAuth = useSelector(selectUserAuth);

  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 299,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      category: 'tshirts'
    },
    {
      id: 2,
      name: 'Denim Jeans',
      price: 799,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
      category: 'jeans'
    },
    {
      id: 3,
      name: 'Casual Hoodie',
      price: 599,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'hoodies'
    },
    {
      id: 4,
      name: 'Formal Shirt',
      price: 899,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
      category: 'shirts'
    },
    {
      id: 5,
      name: 'Black Polo Shirt',
      price: 499,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
      category: 'tshirts'
    },
    {
      id: 6,
      name: 'Slim Fit Chinos',
      price: 699,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      category: 'jeans'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our collection of quality clothing and accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    Rs. {product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-gray-600 text-sm">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication Notice */}
        {!userAuth && (
          <div className="text-center bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Login Required
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              To add items to your cart or wishlist, please log in to your account.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs mx-auto">
              <button className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors">
                Login
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;