import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BenefitCard from './BenefitCard';
import { useUserData } from '../../context/UserDataContext';

// Import benefit categories
import { healthBenefits, mentalBenefits, financialBenefits, relationshipBenefits } from './benefitData';

/**
 * Dashboard tab component
 * 
 * Shows benefit cards and progress information
 */
const DashboardTab = () => {
  const [showingReason, setShowingReason] = useState(null);
  
  // Get user data from context
  const { 
    calculateSobrietyDays, 
    setPositiveChoices,
    setLastInteraction
  } = useUserData();
  
  // Handle card click - tracks interaction and opens/closes cards
  const handleReasonClick = (reasonId) => {
    // Toggle showing/hiding the card content
    if (showingReason === reasonId) {
      setShowingReason(null);
    } else {
      setShowingReason(reasonId);
      
      // Record positive interaction
      setPositiveChoices(prev => prev + 1);
      setLastInteraction(Date.now());
    }
  };
  
  // Benefits data with calculated progress
  const benefitCategories = [
    {
      id: 'health',
      title: 'Regenerating Your Body from Within',
      icon: 'heart',
      iconColor: 'text-red-500',
      content: "Your liver is not just filtering toxins; it's actively regenerating new cells. By abstaining, you're giving it the chance to repair years of damage, potentially reversing fatty liver disease and significantly lowering cancer risks. Your immune system is recalibrating, inflammation is reducing, and your cardiovascular system is recovering.",
      alternative: "Fuel your body with nutrient-rich foods and hydration. Your cells are thanking you.",
      progress: Math.min(100, calculateSobrietyDays() * 0.5),
      benefits: healthBenefits
    },
    {
      id: 'clarity',
      title: 'Unlocking Mental Potential',
      icon: 'brain',
      iconColor: 'text-blue-500',
      content: "Alcohol disrupts neuroplasticity, the brain's ability to rewire and adapt. By choosing sobriety, you're allowing your cognitive functions to sharpen. Memory retention improves, emotional regulation strengthens, and your capacity for deep thought and creativity expands. You're actively restoring your brain's ability to function at its highest potential.",
      alternative: "Engage in learning something new—whether it's a language, an instrument, or a concept. Your mind is your greatest asset.",
      progress: Math.min(100, calculateSobrietyDays() * 0.3),
      benefits: mentalBenefits
    },
    {
      id: 'financial',
      title: 'Wealth Beyond Money',
      icon: 'wallet',
      iconColor: 'text-green-500',
      content: "Sobriety isn't just about saving money; it's about investing in your future. Every dollar not spent on alcohol is an opportunity—a class you can take, an experience you can have, a skill you can develop. Beyond financial savings, you're also reclaiming time and energy that can be redirected towards self-growth and meaningful relationships.",
      alternative: "Create a vision board of your financial and personal goals. Watch how they manifest when you commit to them.",
      progress: Math.min(100, calculateSobrietyDays() * 0.4),
      benefits: financialBenefits
    },
    {
      id: 'relationships',
      title: 'Authentic Connections',
      icon: 'users',
      iconColor: 'text-purple-500',
      content: "Sobriety creates space for deeper, more meaningful relationships. By showing up authentically, you'll discover who truly values your presence. Your communication becomes clearer, your empathy deepens, and your capacity for genuine connection expands. Old relationships may transform, and new ones will form on stronger foundations.",
      alternative: "Reach out to someone you care about today. Share something meaningful rather than just small talk.",
      progress: Math.min(100, calculateSobrietyDays() * 0.25),
      benefits: relationshipBenefits
    }
  ];
  
  return (
    <div className="space-y-2">
      <div className="grid gap-4 md:grid-cols-2">
        {benefitCategories.map((category) => (
          <BenefitCard
            key={category.id}
            category={category}
            isOpen={showingReason === category.id}
            onToggle={() => handleReasonClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardTab;
