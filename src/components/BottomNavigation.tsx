import React from 'react';
import { Home, BookOpen, Award, User, Zap } from 'lucide-react';

export function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: BookOpen
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award
    },
    {
      id: 'contests',
      label: 'Contests',
      icon: Zap
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50 backdrop-blur-sm bg-white/95">
      <div className="flex justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center py-2 px-2 rounded-lg transition-colors hover:bg-gray-50 min-w-0 flex-1"
            >
              <IconComponent 
                className={`w-5 h-5 mb-1 ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`} 
              />
              <span 
                className={`text-xs ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}