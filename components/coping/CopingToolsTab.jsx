import React, { useState } from 'react';
import CopingStrategyCard from './CopingStrategyCard';
import { copingStrategies } from './copingData';

/**
 * CopingToolsTab component
 * 
 * Displays a collection of coping strategies for users
 */
const CopingToolsTab = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  
  // Toggle selected strategy
  const toggleStrategy = (strategyId) => {
    if (selectedStrategy === strategyId) {
      setSelectedStrategy(null);
    } else {
      setSelectedStrategy(strategyId);
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Coping Strategies</h2>
        
        <p className="text-gray-600 mb-6">
          These evidence-based techniques can help you navigate challenging moments. 
          Click on any strategy to see detailed steps.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          {copingStrategies.map((strategy) => (
            <CopingStrategyCard
              key={strategy.id}
              strategy={strategy}
              isOpen={selectedStrategy === strategy.id}
              onToggle={() => toggleStrategy(strategy.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CopingToolsTab;
