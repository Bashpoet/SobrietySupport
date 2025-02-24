import React from 'react';
import { motion } from 'framer-motion';
import { X, Phone, AlertCircle } from 'lucide-react';

/**
 * Emergency Support component
 * 
 * Displays emergency contact information
 */
const EmergencySupport = ({ closeEmergencySupport }) => {
  // Emergency contact list
  const emergencyContacts = [
    { name: 'National Crisis Hotline', number: '988' },
    { name: 'AA 24/7 Hotline', number: '1-800-839-1686' },
    { name: 'SAMHSA Helpline', number: '1-800-662-4357' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="border border-red-200 bg-red-50 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-red-700 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              24/7 Support Available
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
              onClick={closeEmergencySupport}
              aria-label="Close emergency support"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {emergencyContacts.map(contact => (
              <div key={contact.name} className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="font-medium">{contact.name}:</span>
                <a 
                  href={`tel:${contact.number.replace(/-/g, '')}`}
                  className="text-red-600 hover:text-red-700 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                >
                  {contact.number}
                </a>
              </div>
            ))}
            <div className="pt-2 text-sm text-red-700">
              <p>If you're experiencing an immediate emergency, please call 911.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencySupport;
