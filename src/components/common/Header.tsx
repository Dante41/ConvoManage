import React from 'react';
import { Calendar, User, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { user, userRole, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ConvoManage</h1>
              <p className="text-xs text-gray-500 capitalize">{userRole} Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Conferences
            </a>
            {userRole === 'organizer' && (
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Analytics
              </a>
            )}
            {userRole === 'speaker' && (
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                My Sessions
              </a>
            )}
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Schedule
            </a>
          </nav>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-900">{user?.user_metadata?.full_name || 'User'}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}