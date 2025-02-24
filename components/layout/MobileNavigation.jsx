import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  BookOpen, 
  AlertTriangle, 
  Zap, 
  Users, 
  MessageSquare 
} from 'lucide-react';

/**
 * Mobile navigation menu component
 */
const MobileNavigation = ({ activeTab, setActiveTab, closeMobileMenu }) => {
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
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
    >
      <div className="p-2" role="tablist" aria-label="Navigation tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-tab`}
            id={`mobile-${tab.id}-tab-button`}
            onClick={() => {
              setActiveTab(tab.id);
              closeMobileMenu();
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
