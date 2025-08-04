import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon,
  BookOpenIcon,
  BeakerIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { 
    currentUser, 
    setCurrentUser, 
    currentAdmin, 
    setCurrentAdmin, 
    isAdminAuthenticated,
    sidebarCollapsed,
    toggleSidebar 
  } = useApp();

  const learnerNavigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Learning Path', href: '/learning', icon: BookOpenIcon },
    { name: 'Assessments', href: '/assessments', icon: BeakerIcon },
  ];

  const adminNavigation = [
    { name: 'Overview', href: '/admin', icon: ChartBarIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Agents', href: '/admin/agents', icon: CogIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  ];

  const navigation = isAdminAuthenticated ? adminNavigation : learnerNavigation;
  const isAdmin = isAdminAuthenticated;

  const handleLogout = () => {
    if (isAdmin) {
      setCurrentAdmin(null);
    } else {
      setCurrentUser(null);
    }
  };

  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 min-h-screen transition-all duration-300 ease-in-out ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header with Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="relative">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                  <SparklesIcon className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hexaware Learning
                </h1>
                <p className="text-xs text-gray-500">
                  {isAdmin ? 'Admin Portal' : 'GenAI Powered'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            {sidebarCollapsed ? (
              <Bars3Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            ) : (
              <XMarkIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      {!isAdmin && currentUser && !sidebarCollapsed && (
        <div className="p-4 animate-slide-down">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{currentUser.name}</h3>
                <p className="text-sm text-gray-600 truncate">{currentUser.role}</p>
                <p className="text-xs text-gray-500 truncate">TSR: {currentUser.tsrRole}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-indigo-600">{currentUser.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${currentUser.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Profile Section */}
      {isAdmin && currentAdmin && !sidebarCollapsed && (
        <div className="p-4 animate-slide-down">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{currentAdmin.name}</h3>
                <p className="text-sm text-gray-600 truncate">{currentAdmin.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? `${isAdmin 
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 shadow-sm border-l-4 border-purple-500' 
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border-l-4 border-blue-500'
                    }`
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
              }`}
              title={sidebarCollapsed ? item.name : ''}
            >
              <item.icon className={`h-5 w-5 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'} transition-colors`} />
              {!sidebarCollapsed && (
                <span className="animate-fade-in">{item.name}</span>
              )}
              {isActive && !sidebarCollapsed && (
                <div className="absolute right-3">
                  <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-blue-500'} animate-pulse`} />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className={`${sidebarCollapsed ? 'fixed bottom-4 left-4' : 'absolute bottom-4 left-3'}`}>
        <button
          onClick={handleLogout}
          className={`${sidebarCollapsed ? 'w-12 h-12 rounded-full shadow-lg' : 'w-auto'} flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group ${
            sidebarCollapsed ? 'justify-center bg-white border border-gray-200' : ''
          }`}
          title={sidebarCollapsed ? 'Sign Out' : ''}
        >
          <ArrowRightOnRectangleIcon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} group-hover:text-red-600 transition-colors`} />
          {!sidebarCollapsed && (
            <span className="animate-fade-in">Sign Out</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navigation;