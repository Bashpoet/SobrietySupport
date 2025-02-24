import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

/**
 * Custom hook for localStorage interaction with error handling
 * 
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if key doesn't exist
 * @param {number} debounceTime - Optional debounce time in ms (default: 500ms)
 * @returns {[*, Function]} - Current value and setter function
 */
export const useLocalStorage = (key, initialValue, debounceTime = 500) => {
  // Create state variable with getter and setter
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get value from localStorage
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or return initialValue
      if (item === null) {
        return initialValue;
      }
      
      // Handle various data types appropriately
      try {
        return JSON.parse(item);
      } catch (e) {
        // If parsing fails, it might be a string that doesn't need parsing
        return item;
      }
    } catch (error) {
      // If error, return initial value
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Create a debounced version of the localStorage setter
  const debouncedSetItem = useCallback(
    debounce((key, value) => {
      try {
        // Check if value is an event (from input onChange)
        if (value && typeof value === 'object' && value.target) {
          value = value.target.value;
        }
        
        // Convert to string for localStorage
        const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
        window.localStorage.setItem(key, valueToStore);
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
    }, debounceTime),
    [key, debounceTime]
  );
  
  // Return wrapper setter that saves to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to localStorage with debounce
      debouncedSetItem(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, debouncedSetItem]);
  
  // Listen for changes to this localStorage key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          // Update state with new value
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch {
          // If parsing fails, use the raw value
          setStoredValue(e.newValue);
        }
      }
    };
    
    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      debouncedSetItem.cancel(); // Cancel any pending debounce
    };
  }, [key, debouncedSetItem]);
  
  return [storedValue, setValue];
};
