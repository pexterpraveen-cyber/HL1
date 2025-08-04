import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpenIcon, EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { adminUser } from '../../data/mockData';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState<'employee' | 'admin'>('employee');
  const navigate = useNavigate();
  const { setCurrentUser, setCurrentAdmin, users } = useApp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginType === 'admin') {
      // Admin login
      if (email === adminUser.email && password === 'admin123') {
        setCurrentAdmin(adminUser);
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. Try: admin@hexaware.com / admin123');
      }
    } else {
      // Employee login
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === 'password123') {
        setCurrentUser(user);
        navigate('/');
      } else {
        setError('Invalid email or password. Try: praveen@hexaware.com / password123');
      }
    }
    
    setIsLoading(false);
  };

  const demoLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="relative">
              <BookOpenIcon className="w-10 h-10 text-white" />
              <SparklesIcon className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Hexaware Learning
          </h1>
          <p className="text-gray-600 text-lg">Powered by GenAI for Personalized Learning</p>
        </div>

        {/* Login Type Toggle */}
        <div className="mb-6 animate-slide-up">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-white/20">
            <button
              type="button"
              onClick={() => setLoginType('employee')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                loginType === 'employee'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Employee Login
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                loginType === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Admin Login
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up delay-200">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 animate-shake">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-4 px-4 rounded-xl font-semibold focus:ring-2 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                loginType === 'employee'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {loginType === 'employee' ? 'Signing in...' : 'Authenticating...'}
                </div>
              ) : (
                loginType === 'employee' ? 'Sign In' : 'Admin Access'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {loginType === 'employee' ? (
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <p className="text-sm text-gray-600 mb-4 text-center">Demo Employees (Click to auto-fill):</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => demoLogin('praveen@hexaware.com')}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-sm font-medium text-gray-900">Praveen</div>
                  <div className="text-xs text-gray-500">Senior Developer</div>
                </button>
                <button
                  onClick={() => demoLogin('vittal@hexaware.com')}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-sm font-medium text-gray-900">Vittal</div>
                  <div className="text-xs text-gray-500">DevOps Engineer</div>
                </button>
                <button
                  onClick={() => demoLogin('esther@hexaware.com')}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-sm font-medium text-gray-900">Esther</div>
                  <div className="text-xs text-gray-500">Data Analyst</div>
                </button>
                <button
                  onClick={() => demoLogin('laksshaiya@hexaware.com')}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-sm font-medium text-gray-900">Laksshaiya</div>
                  <div className="text-xs text-gray-500">QA Engineer</div>
                </button>
                <button
                  onClick={() => demoLogin('john@hexaware.com')}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-sm font-medium text-gray-900">John</div>
                  <div className="text-xs text-gray-500">New Employee</div>
                </button>
                <button
                  onClick={() => demoLogin('sarah@hexaware.com')}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-sm font-medium text-gray-900">Sarah</div>
                  <div className="text-xs text-gray-500">New Employee</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <p className="text-sm text-gray-600 mb-4 text-center">Admin Credentials:</p>
              <button
                onClick={() => {
                  setEmail('admin@hexaware.com');
                  setPassword('admin123');
                }}
                className="w-full text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-sm font-medium text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">admin@hexaware.com / admin123</div>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in delay-500">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline">
              Contact Hexaware IT Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;