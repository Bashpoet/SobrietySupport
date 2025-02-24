import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ThumbsUp } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';

/**
 * CopingStrategyCard component
 * 
 * Displays a collapsible card with coping strategy details
 */
const CopingStrategyCard = ({ strategy, isOpen, onToggle }) => {
  const { addJournalEntry, setJournalMood } = useUserData();
  
  // Log a success with this strategy
  const logSuccess = (e) => {
    e.stopPropagation(); // Prevent toggling the card
    const message = `I used the ${strategy.title} technique today and it helped me stay on track.`;
    addJournalEntry(message);
    setJournalMood('good'); // Default to 'good' mood for success logs
  };
  
  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all duration-200 ${
        isOpen 
          ? 'shadow-md bg-blue-50 border-blue-200' 
          : 'hover:shadow-sm hover:border-gray-300'
      }`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      aria-controls={`strategy-content-${strategy.id}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${strategy.iconBg || 'bg-blue-100'}`}>
              {strategy.icon}
            </div>
            <h3 className="font-medium text-gray-800">{strategy.title}</h3>
          </div>
          
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-3 mt-3 border-t border-blue-200"
              id={`strategy-content-${strategy.id}`}
            >
              <p className="text-gray-600 mb-4">{strategy.description}</p>
              
              <h4 className="font-medium text-gray-700 mb-2">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                {strategy.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              
              <div className="flex justify-end">
                <button
                  className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm flex items-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={logSuccess}
                  aria-label={`Log success using ${strategy.title} technique`}
                >
                  <ThumbsUp className="w-3.5 h-3.5 mr-1.5" />
                  Log Success
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CopingStrategyCard;
