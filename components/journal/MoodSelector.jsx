import React from 'react';
import { useUserData } from '../../context/UserDataContext';

/**
 * MoodSelector component
 * 
 * Radio-button style mood selection for journal entries
 */
const MoodSelector = ({ selected, onChange }) => {
  const { getMoodEmoji } = useUserData();
  
  // Available mood options
  const moods = [
    'great',
    'good',
    'neutral',
    'difficult',
    'struggling'
  ];
  
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select your mood">
      {moods.map(mood => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange(mood)}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selected === mood
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
          }`}
          role="radio"
          aria-checked={selected === mood}
          aria-label={`Mood: ${mood}`}
        >
          <span className="mr-1.5">{getMoodEmoji(mood)}</span>
          <span className="capitalize">{mood}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
