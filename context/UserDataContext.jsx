import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create context
const UserDataContext = createContext(null);

/**
 * Provider component for user data
 * 
 * Manages all user-specific data including sobriety information,
 * journal entries, triggers, and achievements
 */
export const UserDataProvider = ({ children }) => {
  // Core user data
  const [userName, setUserName] = useLocalStorage('userName', '');
  const [sobrietyDate, setSobrietyDate] = useLocalStorage('sobrietyDate', '');
  const [streak, setStreak] = useLocalStorage('sobrietyStreak', 0);
  const [achievements, setAchievements] = useLocalStorage('achievements', []);
  const [positiveChoices, setPositiveChoices] = useLocalStorage('positiveChoices', 0);
  const [lastCheckDate, setLastCheckDate] = useLocalStorage('lastCheckDate', null);
  
  // Journal-related state
  const [journalEntries, setJournalEntries] = useLocalStorage('journalEntries', []);
  const [journalMood, setJournalMood] = useState('neutral');
  
  // Trigger-related state
  const [triggers, setTriggers] = useLocalStorage('triggers', []);
  
  // Custom goals & settings
  const [customGoals, setCustomGoals] = useLocalStorage('customGoals', []);
  const [showAllJournalEntries, setShowAllJournalEntries] = useState(false);
  const [showingAllBenefits, setShowingAllBenefits] = useState(null);
  
  // User interaction tracking
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  
  // Milestone definitions
  const milestones = [
    { days: 1, badge: '🌱', message: 'First Day Champion!' },
    { days: 7, badge: '🌟', message: 'One Week Strong!' },
    { days: 30, badge: '🏆', message: 'Monthly Milestone Master!' },
    { days: 90, badge: '💫', message: 'Quarterly Quest Complete!' },
    { days: 180, badge: '🌈', message: 'Half Year of Healing!' },
    { days: 365, badge: '👑', message: 'Year of Transformation!' }
  ];
  
  // Check for achievement milestones
  const checkForMilestones = useCallback((currentStreak) => {
    const milestone = milestones.find(m => m.days === currentStreak);
    
    if (milestone && !achievements.includes(milestone.badge)) {
      setAchievements(prevAchievements => {
        const newAchievements = [...prevAchievements, milestone.badge];
        return newAchievements;
      });
      
      // Show notification if supported
      if (Notification.permission === "granted") {
        new Notification("Achievement Unlocked!", {
          body: milestone.message,
          icon: "/favicon.ico"
        });
      }
      
      return milestone.message;
    }
    
    return null;
  }, [achievements, milestones, setAchievements]);
  
  // Calculate days since sobriety date
  const calculateSobrietyDays = useCallback(() => {
    if (!sobrietyDate) return streak;
    
    const startDate = new Date(sobrietyDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }, [sobrietyDate, streak]);
  
  // Check if it's a new day and update streak
  const checkAndUpdateStreak = useCallback(() => {
    const today = new Date().toDateString();
    
    if (lastCheckDate !== today) {
      // It's a new day
      const lastCheck = lastCheckDate ? new Date(lastCheckDate) : null;
      const now = new Date();
      
      if (!lastCheck || (now - lastCheck) < (48 * 60 * 60 * 1000)) {
        // Less than 48 hours since last check, increment streak
        setStreak(prev => {
          const newStreak = prev + 1;
          checkForMilestones(newStreak);
          return newStreak;
        });
      } else {
        // More than 48 hours, reset streak
        setStreak(1);
      }
      
      setLastCheckDate(today);
    }
  }, [lastCheckDate, setLastCheckDate, setStreak, checkForMilestones]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get emoji for mood display
  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'great': return '😄';
      case 'good': return '🙂';
      case 'neutral': return '😐';
      case 'difficult': return '😕';
      case 'struggling': return '😣';
      default: return '😐';
    }
  };
  
  // Helper function for trigger color based on intensity
  const getTriggerColor = (intensity) => {
    if (intensity >= 7) return "bg-red-50 text-red-700 border-red-200";
    if (intensity >= 4) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-green-50 text-green-700 border-green-200";
  };
  
  // Add a new journal entry
  const addJournalEntry = (content) => {
    if (!content.trim()) return false;
    
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: content,
      mood: journalMood
    };
    
    setJournalEntries(prev => [entry, ...prev]);
    setJournalMood('neutral');
    setLastInteraction(Date.now());
    
    return true;
  };
  
  // Add a new trigger
  const addTrigger = (name, intensity) => {
    if (!name.trim()) return false;
    
    const trigger = {
      id: Date.now(),
      name: name,
      intensity: intensity,
      dateAdded: new Date().toISOString()
    };
    
    setTriggers(prev => [trigger, ...prev]);
    setLastInteraction(Date.now());
    
    return true;
  };
  
  // Handle initial setup
  useEffect(() => {
    // Check if it's a new day to update streak
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);
  
  // Create context value object
  const contextValue = {
    // User data
    userName,
    setUserName,
    sobrietyDate,
    setSobrietyDate,
    streak,
    setStreak,
    achievements,
    setAchievements,
    positiveChoices,
    setPositiveChoices,
    
    // Journal
    journalEntries,
    setJournalEntries,
    journalMood,
    setJournalMood,
    addJournalEntry,
    showAllJournalEntries,
    setShowAllJournalEntries,
    
    // Triggers
    triggers,
    setTriggers,
    addTrigger,
    
    // Utility functions
    calculateSobrietyDays,
    checkForMilestones,
    formatDate,
    getMoodEmoji,
    getTriggerColor,
    milestones,
    
    // UI state
    customGoals,
    setCustomGoals,
    showingAllBenefits,
    setShowingAllBenefits,
    
    // User interaction
    lastInteraction,
    setLastInteraction
  };
  
  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook for using the UserData context
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
