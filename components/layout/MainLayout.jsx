import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import Settings from '../settings/Settings';
import EmergencySupport from '../support/EmergencySupport';

// Tab components
import DashboardTab from '../dashboard/DashboardTab';
import JournalTab from '../journal/JournalTab';
import TriggersTab from '../triggers/TriggersTab';
import CopingToolsTab from '../coping/CopingToolsTab';
import CommunityTab from '../community/CommunityTab';
import UrgeSupportTab from '../support/UrgeSupportTab';

// Hooks and context
import { useUserData } from '../../context/UserDataContext';
import { useAPI } from '../../context/APIContext';

/**
 * Main layout component
 * 
 * Handles tab navigation and wraps the application UI
 */
const MainLayout = () => {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  
  // Context
  const { setLastInteraction } = useUserData();
  
  // Check-in timer ref
  const timerRef = useRef(null);
  
  // Setup a reminder to check in
  const setupCheckInReminder = () => {
    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Set reminder for 8 hours after last interaction
    timerRef.current = setTimeout(() => {
      const notificationPermission = Notification.permission;
      
      if (notificationPermission === "granted") {
        new Notification("Sobriety Check-In", {
          body: "It's been a while. How are you feeling today?",
          icon: "/favicon.ico"
        });
      }
    }, 8 * 60 * 60 * 1000); // 8 hours
  };
  
  // User interaction handler - resets the check-in timer
  const handleUserInteraction = () => {
    setLastInteraction(Date.now());
    setupCheckInReminder();
  };
  
  // Request notification permission if not already granted
  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      // We'll wait for user interaction before requesting
      const handleFirstInteraction = () => {
        Notification.requestPermission();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
      
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
      
      // Clean up event listeners if component unmounts
      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
    }
    
    // Set up check-in reminder
    setupCheckInReminder();
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  // Add interaction tracking on user actions
  useEffect(() => {
    const trackInteraction = () => {
      handleUserInteraction();
    };
    
    // Track clicks and key presses
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    
    return () => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
    };
  }, []);
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'journal':
        return <JournalTab />;
      case 'triggers':
        return <TriggersTab />;
      case 'coping':
        return <CopingToolsTab />;
      case 'community':
        return <CommunityTab />;
      case 'urge-support':
        return <UrgeSupportTab />;
      default:
        return <DashboardTab />;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden flex justify-between items-center mb-2">
        <button
          className="text-gray-500 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <button
          className="text-gray-500 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setShowSettings(!showSettings)}
          aria-label={showSettings ? "Close settings" : "Open settings"}
          aria-expanded={showSettings}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNavigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeMobileMenu={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <Settings 
            closeSettings={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Main Header */}
      <Header 
        showSettings={() => setShowSettings(true)}
        showEmergencySupport={() => setShowEmergency(true)}
      />
      
      {/* Emergency Support Panel */}
      <AnimatePresence>
        {showEmergency && (
          <EmergencySupport 
            closeEmergencySupport={() => setShowEmergency(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <DesktopNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default MainLayout;
