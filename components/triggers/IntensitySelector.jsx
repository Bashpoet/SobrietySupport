import React from 'react';

/**
 * IntensitySelector component
 * 
 * Dropdown selector for trigger intensity levels
 */
const IntensitySelector = ({ value, onChange }) => {
  // Handle select change
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };
  
  // Get text and color based on intensity
  const getIntensityInfo = (intensity) => {
    if (intensity >= 7) return { text: 'High', color: 'text-red-700' };
    if (intensity >= 4) return { text: 'Medium', color: 'text-yellow-700' };
    return { text: 'Low', color: 'text-green-700' };
  };
  
  const { text, color } = getIntensityInfo(value);
  
  return (
    <div className="relative">
      <label htmlFor="intensity-select" className="sr-only">Select trigger intensity</label>
      <select
        id="intensity-select"
        value={value}
        onChange={handleChange}
        className={`w-full pl-3 pr-8 py-2 border border-gray-300 bg-white rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${color}`}
        aria-label="Trigger intensity level"
      >
        <option value="1">Very Low</option>
        <option value="2">Low</option>
        <option value="3">Low-Medium</option>
        <option value="4">Medium</option>
        <option value="5">Medium</option>
        <option value="6">Medium-High</option>
        <option value="7">High</option>
        <option value="8">Very High</option>
        <option value="9">Extreme</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default IntensitySelector;
