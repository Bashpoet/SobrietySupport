import React from 'react';
import { useUserData } from '../../context/UserDataContext';

/**
 * TriggerItem component
 * 
 * Displays a single trigger with its intensity and date
 */
const TriggerItem = ({ trigger, formatDate }) => {
  const { getTriggerColor } = useUserData();
  
  // Get appropriate intensity label
  const getIntensityLabel = (intensity) => {
    if (intensity >= 8) return 'Extreme';
    if (intensity >= 7) return 'Very High';
    if (intensity >= 6) return 'High';
    if (intensity >= 4) return 'Medium';
    if (intensity >= 2) return 'Low';
    return 'Very Low';
  };
  
  // Get trigger color class from context
  const colorClass = getTriggerColor(trigger.intensity);
  
  return (
    <div className={`border rounded-lg overflow-hidden ${colorClass.split(' ').filter(cls => cls.startsWith('border'))[0] || 'border-gray-200'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">{trigger.name}</h4>
            <p className="text-sm text-gray-500 mt-1">Added: {formatDate(trigger.dateAdded)}</p>
          </div>
          <div className="text-right">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
            >
              Intensity: {trigger.intensity} - {getIntensityLabel(trigger.intensity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriggerItem;
