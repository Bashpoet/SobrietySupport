import React from 'react';
import { 
  Users, 
  Brain, 
  MessageCircle, 
  Globe, 
  Heart, 
  LifeBuoy 
} from 'lucide-react';

/**
 * Community resources data
 * 
 * Contains information about online communities and local support options
 */

// Online community resources
export const communityResources = [
  { 
    name: 'Alcoholics Anonymous',
    description: 'The original 12-step fellowship with millions of members worldwide.',
    url: 'https://www.aa.org/',
    icon: <Users className="w-5 h-5 text-blue-600" />
  },
  { 
    name: 'SMART Recovery',
    description: 'Self-Management and Recovery Training - a science-based approach.',
    url: 'https://www.smartrecovery.org/',
    icon: <Brain className="w-5 h-5 text-green-600" />
  },
  { 
    name: 'r/stopdrinking',
    description: 'A supportive Reddit community with over 400,000 members.',
    url: 'https://www.reddit.com/r/stopdrinking/',
    icon: <MessageCircle className="w-5 h-5 text-orange-600" />
  },
  { 
    name: 'Soberistas',
    description: 'An international community focused on positive sober living.',
    url: 'https://soberistas.com/',
    icon: <Globe className="w-5 h-5 text-purple-600" />
  },
  { 
    name: 'Women for Sobriety',
    description: 'A non-profit dedicated to helping women overcome addictions.',
    url: 'https://womenforsobriety.org/',
    icon: <Heart className="w-5 h-5 text-pink-600" />
  },
  { 
    name: 'Tempest Sobriety',
    description: 'A modern digital recovery program with a holistic approach.',
    url: 'https://www.jointempest.com/',
    icon: <LifeBuoy className="w-5 h-5 text-teal-600" />
  }
];

// Local support options
export const localSupportOptions = [
  {
    name: 'AA Meeting Finder',
    description: 'Find Alcoholics Anonymous meetings near your location or browse by area.',
    url: 'https://www.aa.org/find-aa'
  },
  {
    name: 'SMART Recovery Meetings',
    description: 'Locate in-person or online SMART Recovery meetings in your area.',
    url: 'https://www.smartrecovery.org/meetings/'
  },
  {
    name: 'Refuge Recovery',
    description: 'Find Buddhist-inspired recovery meetings that focus on mindfulness.',
    url: 'https://refugerecovery.org/meetings'
  },
  {
    name: 'SAMHSA Treatment Locator',
    description: 'Find professional treatment facilities and support services in your area.',
    url: 'https://findtreatment.samhsa.gov/'
  }
];
