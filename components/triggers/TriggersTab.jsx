import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import TriggerItem from './TriggerItem';
import IntensitySelector from './IntensitySelector';
import { useUserData } from '../../context/UserDataContext';

/**
 * TriggersTab component
 * 
 * Allows managing trigger factors and their intensity
 */
const TriggersTab = () => {
  const [newTrigger, setNewTrigger] = useState('');
  const [triggerIntensity, setTriggerIntensity] = useState(5);
  
  // Get user data from context
  const { 
    triggers, 
    addTrigger, 
    formatDate 
  } = useUserData();
  
  // Handle adding a new trigger
  const handleAddTrigger = () => {
    if (addTrigger(newTrigger, triggerIntensity)) {
      setNewTrigger('');
      setTriggerIntensity(5); // Reset to medium
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Trigger Management</h2>
        
        {/* Add Trigger Form */}
        <div className="space-y-3 mb-6">
          <label htmlFor="trigger-input" className="block text-sm font-medium text-gray-700">
            Add a New Trigger:
          </label>
          <div className="flex gap-2">
            <input
              id="trigger-input"
              type="text"
              value={newTrigger}
              onChange={(e) => setNewTrigger(e.target.value)}
              placeholder="Describe a trigger (event, feeling, place, etc.)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="New trigger description"
            />
            
            <div className="w-32 flex-shrink-0">
              <IntensitySelector
                value={triggerIntensity}
                onChange={setTriggerIntensity}
              />
            </div>
            
            <button
              onClick={handleAddTrigger}
              disabled={!newTrigger.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add new trigger"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add
            </button>
          </div>
        </div>
        
        {/* Triggers List */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-700 mb-4">Your Identified Triggers</h3>
          
          {triggers.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No triggers identified yet. Add your first one to develop coping strategies.</p>
          ) : (
            <div className="space-y-3">
              {triggers.map((trigger) => (
                <TriggerItem
                  key={trigger.id}
                  trigger={trigger}
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

export default TriggersTab;
