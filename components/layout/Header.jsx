import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Shield, Settings as SettingsIcon, RefreshCw, Sparkles } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import { useAPI } from '../../context/APIContext';

/**
 * Header component with personalized greeting and streak display
 */
const Header = ({ showSettings, showEmergencySupport }) => {
  const [timeNow, setTimeNow] = useState(new Date());
  const [message, setMessage] = useState('Every moment of strength matters.');
  
  // Get user data from context
  const { 
    userName, 
    streak, 
    achievements, 
    calculateSobrietyDays, 
    sobrietyDate 
  } = useUserData();
  
  // Get API data from context
  const { 
    personalizedMessages, 
    generatePersonalizedMessage, 
    isGeneratingMessage, 
    isApiConfigured, 
    personalizationEnabled,
    cooldownRemaining
  } = useAPI();
  
  // Update time and message periodically
  useEffect(() => {
    // Optimized time update interval - only updates when hour changes
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() !== timeNow.getHours()) {
        setTimeNow(now);
      }
    }, 300000); // Check every 5 minutes
    
    // Set last personalized message if available
    if (personalizedMessages.length > 0) {
      setMessage(personalizedMessages[personalizedMessages.length - 1].text);
    }
    
    return () => clearInterval(interval);
  }, [personalizedMessages, timeNow]);
  
  // Generate a personalized message
  const handleGenerateMessage = () => {
    if (cooldownRemaining > 0) return;
    
    const sobrietyDays = calculateSobrietyDays();
    const timeOfDay = getTimeOfDay();
    
    // Prepare user context for message generation
    const userContext = {
      name: userName,
      sobrietyDays,
      timeOfDay,
      mood: 'neutral', // Default mood for header messages
      journalEntries: [] // We don't send journal entries from here for privacy
    };
    
    // Generate message and update header
    generatePersonalizedMessage(userContext)
      .then(result => {
        if (result?.message) {
          setMessage(result.message);
        } else if (result?.error) {
          setMessage(result.error);
        }
      });
  };
  
  // Get time-based message
  const getTimeMessage = () => {
    const hour = timeNow.getHours();
    
    if (hour < 5) return { 
      icon: <Moon className="w-8 h-8 text-indigo-600" />, 
      message: "The quiet hours are a time for deep rest. You're doing great." 
    };
    if (hour < 12) return { 
      icon: <Sun className="w-8 h-8 text-yellow-400" />, 
      message: "Good morning. Each new day is a fresh opportunity." 
    };
    if (hour < 17) return { 
      icon: <Sun className="w-8 h-8 text-orange-400" />, 
      message: "Afternoon check-in. Stay present with your intentions." 
    };
    if (hour < 21) return { 
      icon: <Moon className="w-8 h-8 text-indigo-400" />, 
      message: "Evening is here. You've made it through another day strong." 
    };
    return { 
      icon: <Moon className="w-8 h-8 text-indigo-600" />, 
      message: "Winding down. Reflect on today's victories, no matter how small." 
    };
  };
  
  // Helper function to get time of day
  const getTimeOfDay = () => {
    const hour = timeNow.getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };
  
  // Get current time message
  const timeMessage = getTimeMessage();
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {timeMessage.icon}
          <div>
            <h2 className="text-xl font-semibold">{timeMessage.message}</h2>
            {userName && <p className="text-gray-600">Welcome back, {userName}</p>}
          </div>
        </div>
        
        <div className="hidden md:flex">
          <button 
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={showSettings}
            aria-label="Open settings"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </button>
          
          <button 
            className="px-4 py-2 border border-red-200 bg-red-50 rounded-md text-red-600 flex items-center hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={showEmergencySupport}
            aria-label="Show emergency support contacts"
          >
            <Shield className="w-4 h-4 mr-2" />
            Emergency Support
          </button>
        </div>
        
        <div className="md:hidden">
          <button 
            className="px-3 py-1 border border-red-200 bg-red-50 rounded-md text-red-600 flex items-center hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={showEmergencySupport}
            aria-label="Show emergency support contacts"
          >
            <Shield className="w-4 h-4 mr-1" />
            Help
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          {isGeneratingMessage ? (
            <div className="flex items-center animate-pulse text-purple-600">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>Personalizing your message...</span>
            </div>
          ) : (
            <>
              <p className="text-lg font-medium text-purple-700">{message}</p>
              {isApiConfigured && personalizationEnabled && (
                <button
                  className="h-6 w-6 text-purple-600 rounded-full hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
                  onClick={handleGenerateMessage}
                  disabled={cooldownRemaining > 0}
                  aria-label={cooldownRemaining > 0 
                    ? `Generate new message (available in ${cooldownRemaining}s)` 
                    : "Generate new message"}
                  title={cooldownRemaining > 0 
                    ? `Available in ${cooldownRemaining}s` 
                    : "Generate new message"}
                >
                  <RefreshCw className="h-4 w-4 mx-auto" />
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-500">
            Streak: <strong>{sobrietyDate ? calculateSobrietyDays() : streak} days</strong>
          </p>
          <div className="flex gap-1 ml-2">
            {achievements.map((badge, i) => (
              <span key={i} className="text-2xl" role="img" aria-label={`Achievement badge ${i + 1}`}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
