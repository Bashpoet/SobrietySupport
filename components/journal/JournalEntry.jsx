import React from 'react';
import { useUserData } from '../../context/UserDataContext';

/**
 * JournalEntry component
 * 
 * Displays a single journal entry with date and mood
 */
const JournalEntry = ({ entry, formatDate }) => {
  const { getMoodEmoji } = useUserData();
  
  return (
    <div className="bg-gray-50 border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {getMoodEmoji(entry.mood)} {entry.mood}
        </span>
      </div>
      <div className="text-gray-700 whitespace-pre-wrap">{entry.content}</div>
    </div>
  );
};

export default JournalEntry;
