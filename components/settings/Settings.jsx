import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  RefreshCw, 
  Bell, 
  Lock 
} from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import { useAPI } from '../../context/APIContext';

/**
 * Settings panel component
 */
const Settings = ({ closeSettings }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  
  // Get user data from context
  const {
    userName,
    setUserName,
    sobrietyDate,
    setSobrietyDate
  } = useUserData();
  
  // Get API data from context
  const {
    isApiConfigured,
    personalizationEnabled,
    setPersonalizationEnabled,
    saveApiKey,
    clearApiKey
  } = useAPI();
  
  // Handle sobriety date change with validation
  const handleSobrietyDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    
    if (selectedDate > today) {
      alert("Please select a date in the past.");
      return;
    }
    setSobrietyDate(e.target.value);
  };
  
  // Handle API key save
  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      const success = saveApiKey(apiKeyInput);
      if (success) {
        setApiKeyInput('');
      }
    }
  };
  
  // Request notification permission
  const requestNotifications = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md mb-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-blue-700">Personal Settings</h2>
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
              onClick={closeSettings}
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* User Name */}
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Sobriety Date */}
            <div>
              <label htmlFor="sobriety-date" className="block text-sm font-medium text-gray-700 mb-1">
                Sobriety Start Date
              </label>
              <input
                id="sobriety-date"
                type="date"
                value={sobrietyDate}
                onChange={handleSobrietyDateChange}
                max={new Date().toISOString().split('T')[0]} // Prevent future dates
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                aria-label="Set your sobriety start date"
              />
            </div>
            
            {/* API Configuration */}
            <div className="border-t border-blue-200 pt-4">
              <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Personalization
              </h3>
              
              {!isApiConfigured ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Enable personalized messages, journal prompts, and real-time support by adding your Anthropic API key.
                  </p>
                  <div className="relative max-w-xs">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Enter your Claude API key"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={handleSaveApiKey}
                      disabled={!apiKeyInput.trim()}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 mr-2 inline-block" />
                      Enable AI Features
                    </button>
                    
                    <button 
                      onClick={() => {
                        alert('Your API key will be stored in session storage and will be cleared when you close the browser.');
                      }}
                      className="ml-2 text-xs text-gray-500 underline hover:text-gray-700"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AI Personalization</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Enabled
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setPersonalizationEnabled(!personalizationEnabled)}
                    >
                      {personalizationEnabled ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Disable
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Enable
                        </>
                      )}
                    </button>
                    
                    <button 
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={clearApiKey}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset API Key
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Note: Your API key is stored in session storage and will be cleared when you close your browser.</p>
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Permissions</label>
              <button 
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={requestNotifications}
              >
                <Bell className="w-4 h-4 mr-2" />
                {Notification.permission === "granted" 
                  ? "Notifications Enabled" 
                  : "Enable Notifications"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
