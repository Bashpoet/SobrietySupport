import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';

/**
 * JournalPrompt component
 * 
 * Displays AI-generated journal prompts
 */
const JournalPrompt = ({ currentPrompt, isGenerating, onGeneratePrompt, onApplyPrompt }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-purple-50 p-4 rounded-md mb-4"
      id="journal-prompts"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-600 mt-1" />
          <div>
            <h3 className="font-medium text-purple-800 mb-1">Reflection Prompt</h3>
            {isGenerating ? (
              <div className="animate-pulse text-purple-600 text-sm">
                Generating thoughtful prompt...
              </div>
            ) : (
              <p className="text-sm text-purple-700">{currentPrompt || "No prompt available yet."}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 text-gray-500 rounded-full hover:bg-purple-100 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={onGeneratePrompt}
            disabled={isGenerating}
            aria-label="Generate new prompt"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button 
            className="px-3 py-1 text-sm text-purple-700 border border-purple-300 rounded-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={onApplyPrompt}
            disabled={!currentPrompt || isGenerating}
          >
            Use Prompt
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JournalPrompt;
