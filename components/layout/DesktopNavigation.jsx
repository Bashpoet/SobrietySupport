import React from 'react';
import { 
  BarChart, 
  BookOpen, 
  AlertTriangle, 
  Zap, 
  Users, 
  MessageSquare 
} from 'lucide-react';

/**
 * Desktop navigation tabs component
 */
const DesktopNavigation = ({ activeTab, setActiveTab }) => {
  // Tab configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart className="w-4 h-4 mr-2" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { id: 'triggers', label: 'Triggers', icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
    { id: 'coping', label: 'Coping Tools', icon: <Zap className="w-4 h-4 mr-2" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4 mr-2" /> },
    { id: 'urge-support', label: 'Urge Support', icon: <MessageSquare className="w-4 h-4 mr-2" /> }
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="flex -mb-px" role="tablist" aria-label="Navigation tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 focus:outline-none focus:ring-inset focus:ring-blue-500 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-tab`}
            id={`${tab.id}-tab-button`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavigation;
