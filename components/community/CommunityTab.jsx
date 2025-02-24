import React from 'react';
import { ArrowRight, Users, MapPin } from 'lucide-react';
import { communityResources, localSupportOptions } from './communityData';

/**
 * CommunityTab component
 * 
 * Displays community resources and support groups
 */
const CommunityTab = () => {
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Community Support</h2>
        
        <p className="text-gray-600 mb-6">
          Connecting with others who understand your journey can be a powerful part of maintaining sobriety.
          Here are some resources to help you find support.
        </p>
        
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Online Communities
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            {communityResources.map((resource) => (
              <div key={resource.name} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{resource.name}</h4>
                      <p className="text-sm text-gray-600 mt-1 mb-3">{resource.description}</p>
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                        aria-label={`Visit ${resource.name} website`}
                      >
                        Visit Resource
                        <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
          <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            Find Local Support
          </h3>
          
          <p className="text-sm text-gray-700 mb-4">
            In-person meetings provide valuable face-to-face connection and accountability. 
            Use these tools to locate meetings in your area.
          </p>
          
          <div className="space-y-3">
            {localSupportOptions.map((option) => (
              <div key={option.name} className="bg-white rounded-lg p-3 border border-blue-100">
                <h4 className="font-medium text-gray-800 mb-1">{option.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <a 
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                >
                  Find Meetings
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-800 italic">
              Note: Many support groups now offer virtual meetings if in-person attendance isn't possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;
