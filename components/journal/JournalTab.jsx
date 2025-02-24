import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Lightbulb, RefreshCw } from 'lucide-react';
import JournalEntry from './JournalEntry';
import JournalPrompt from './JournalPrompt';
import MoodSelector from './MoodSelector';
import { useUserData } from '../../context/UserDataContext';
import { useAPI } from '../../context/APIContext';

/**
 * Journal tab component
 * 
 * Allows users to create journal entries and view past entries
 */
const JournalTab = () => {
  const [newEntry, setNewEntry] = useState('');
  const [showJournalPrompts, setShowJournalPrompts] = useState(false);
  
  // Get user data from context
  const {
    journalEntries,
    journalMood,
    setJournalMood,
    addJournalEntry,
    showAllJournalEntries,
    setShowAllJournalEntries,
    formatDate
  } = useUserData();
  
  // Get API data from context
  const {
    isApiConfigured,
    personalizationEnabled,
    currentJournalPrompt,
    isGeneratingPrompt,
    generateJournalPrompt
  } = useAPI();
  
  // Handle saving journal entry
  const handleSaveEntry = () => {
    if (addJournalEntry(newEntry)) {
      setNewEntry('');
    } else {
      // Could show error if needed
    }
  };
  
  // Generate a new journal prompt
  const handleGeneratePrompt = () => {
    // Calculate dominant mood
    const recentMoods = journalEntries.slice(0, 5).map(entry => entry.mood);
    const moodCounts = recentMoods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";
    
    // Get recent entries for context
    const recentEntries = journalEntries.slice(0, 3).map(entry => entry.content);
    
    // Prepare context for AI
    const userContext = {
      sobrietyDays: 0, // This will be calculated by the context
      recentEntries,
      dominantMood,
      triggers: [] // We'll get this from the context
    };
    
    // Generate prompt
    generateJournalPrompt(userContext);
  };
  
  // Apply the current prompt to the journal entry
  const applyJournalPrompt = () => {
    if (currentJournalPrompt) {
      setNewEntry(`Prompt: ${currentJournalPrompt}\n\nMy thoughts: `);
      setShowJournalPrompts(false);
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Reflection Journal</h2>
          
          {isApiConfigured && personalizationEnabled && (
            <button 
              className="px-3 py-1.5 text-sm border border-purple-200 rounded-md text-purple-600 flex items-center hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setShowJournalPrompts(!showJournalPrompts)}
              aria-expanded={showJournalPrompts}
              aria-controls="journal-prompts"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showJournalPrompts ? "Hide Prompts" : "Get Prompts"}
            </button>
          )}
        </div>
        
        {/* Journal Prompts Section */}
        <AnimatePresence>
          {showJournalPrompts && (
            <JournalPrompt
              currentPrompt={currentJournalPrompt}
              isGenerating={isGeneratingPrompt}
              onGeneratePrompt={handleGeneratePrompt}
              onApplyPrompt={applyJournalPrompt}
            />
          )}
        </AnimatePresence>
        
        {/* New Entry Section */}
        <div className="space-y-3 mb-4">
          <textarea
            placeholder="How are you feeling today? What triggers or victories have you experienced?"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="w-full min-h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            aria-label="Journal entry text"
          />
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Mood:</span>
            <MoodSelector
              selected={journalMood}
              onChange={setJournalMood}
            />
            
            <div className="ml-auto">
              <button
                onClick={handleSaveEntry}
                disabled={!newEntry.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </button>
            </div>
          </div>
        </div>
        
        {/* Previous Entries Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Previous Entries</h3>
            
            {journalEntries.length > 5 && (
              <button
                onClick={() => setShowAllJournalEntries(!showAllJournalEntries)}
                className="text-sm text-blue-600 hover:text-blue-700"
                aria-label={showAllJournalEntries ? "Show fewer entries" : "View all entries"}
              >
                {showAllJournalEntries ? "Show Less" : `View All (${journalEntries.length})`}
              </button>
            )}
          </div>
          
          {journalEntries.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No journal entries yet. Start tracking your journey today.</p>
          ) : (
            <div className="space-y-4">
              {(showAllJournalEntries ? journalEntries : journalEntries.slice(0, 5)).map((entry) => (
                <JournalEntry
                  key={entry.id}
                  entry={entry}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalTab;
