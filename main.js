import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, Brain, Wallet, Sun, Moon, Battery, Clock, 
  CheckCircle, Shield, Phone, Medal, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SobrietySupport = () => {
  const [timeNow, setTimeNow] = useState(new Date());
  const [showingReason, setShowingReason] = useState(null);
  const [positiveChoices, setPositiveChoices] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [message, setMessage] = useState('Every moment of strength matters.');

  useEffect(() => {
    const interval = setInterval(() => setTimeNow(new Date()), 60000);
    const storedStreak = localStorage.getItem('sobrietyStreak');
    const storedAchievements = localStorage.getItem('achievements');
    
    if (storedStreak) setStreak(parseInt(storedStreak, 10));
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
    
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    { days: 1, badge: '🌱', message: 'First Day Champion!' },
    { days: 7, badge: '🌟', message: 'One Week Strong!' },
    { days: 30, badge: '🏆', message: 'Monthly Milestone Master!' },
    { days: 90, badge: '💫', message: 'Quarterly Quest Complete!' },
    { days: 365, badge: '👑', message: 'Year of Transformation!' }
  ];

  const reasons = [
    {
      id: 'health',
      title: 'Regenerating Your Body from Within',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      content: "Your liver is not just filtering toxins; it's actively regenerating new cells. By abstaining, you're giving it the chance to repair years of damage, potentially reversing fatty liver disease and significantly lowering cancer risks. Your immune system is recalibrating, inflammation is reducing, and your cardiovascular system is recovering from alcohol-induced strain.",
      alternative: "Fuel your body with nutrient-rich foods and hydration. Your cells are thanking you.",
      progress: (days) => Math.min(100, days * 0.5)
    },
    {
      id: 'clarity',
      title: 'Unlocking Mental Potential',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      content: "Alcohol disrupts neuroplasticity, the brain's ability to rewire and adapt. By choosing sobriety, you're allowing your cognitive functions to sharpen. Memory retention improves, emotional regulation strengthens, and your capacity for deep thought and creativity expands. You're actively restoring your brain's ability to function at its highest potential.",
      alternative: "Engage in learning something new—whether it's a language, an instrument, or a concept. Your mind is your greatest asset.",
      progress: (days) => Math.min(100, days * 0.3)
    },
    {
      id: 'financial',
      title: 'Wealth Beyond Money',
      icon: <Wallet className="w-8 h-8 text-green-500" />,
      content: "Sobriety isn't just about saving money; it's about investing in your future. Every dollar not spent on alcohol is an opportunity—a class you can take, an experience you can have, a skill you can develop. Beyond financial savings, you're also reclaiming time and energy that can be redirected towards self-growth and meaningful relationships.",
      alternative: "Create a vision board of your financial and personal goals. Watch how they manifest when you commit to them.",
      progress: (days) => Math.min(100, days * 0.4)
    }
  ];

  const emergencyContacts = [
    { name: 'National Crisis Hotline', number: '988' },
    { name: 'AA 24/7 Hotline', number: '1-800-839-1686' },
    { name: 'SAMHSA Helpline', number: '1-800-662-4357' }
  ];

  const handleReasonClick = (reasonId) => {
    if (showingReason === reasonId) {
      setShowingReason(null);
    } else {
      setShowingReason(reasonId);
      setPositiveChoices(prev => prev + 1);
      
      // Update streak and check milestones
      setStreak(prev => {
        const newStreak = prev + 1;
        localStorage.setItem('sobrietyStreak', newStreak);
        
        // Check for new milestones
        const newMilestone = milestones.find(m => m.days === newStreak);
        if (newMilestone && !achievements.includes(newMilestone.badge)) {
          const newAchievements = [...achievements, newMilestone.badge];
          setAchievements(newAchievements);
          localStorage.setItem('achievements', JSON.stringify(newAchievements));
          setMessage(newMilestone.message);
        }
        
        return newStreak;
      });
    }
  };

  const timeMessage = (() => {
    const hour = timeNow.getHours();
    if (hour < 12) return { icon: <Sun className="w-8 h-8 text-yellow-400" />, message: "Morning is full of possibility." };
    if (hour < 18) return { icon: <Sun className="w-8 h-8 text-orange-400" />, message: "You're doing great. Keep going strong." };
    if (hour < 22) return { icon: <Moon className="w-8 h-8 text-indigo-400" />, message: "The evening is yours to enjoy clearly and fully." };
    return { icon: <Moon className="w-8 h-8 text-indigo-400" />, message: "Rest well, knowing you're making positive choices." };
  })();

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {timeMessage.icon}
              <h2 className="text-xl font-semibold">{timeMessage.message}</h2>
            </div>
            <Button 
              variant="outline" 
              className="bg-red-50 hover:bg-red-100 text-red-600"
              onClick={() => setShowEmergency(prev => !prev)}
            >
              <Shield className="w-4 h-4 mr-2" />
              Emergency Support
            </Button>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-purple-600">{message}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-gray-500">Streak: <strong>{streak} days</strong></p>
              <div className="flex gap-1 ml-2">
                {achievements.map((badge, i) => (
                  <span key={i} className="text-2xl" role="img" aria-label={`Achievement badge ${i + 1}`}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showEmergency && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-red-700 mb-3">24/7 Support Available</h3>
                <div className="space-y-2">
                  {emergencyContacts.map(contact => (
                    <div key={contact.name} className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span className="font-medium">{contact.name}:</span>
                      <a 
                        href={`tel:${contact.number}`}
                        className="text-red-600 hover:text-red-700"
                      >
                        {contact.number}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-2">
        {reasons.map((reason) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                showingReason === reason.id ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white'
              }`}
              onClick={() => handleReasonClick(reason.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {reason.icon}
                    <h3 className="font-medium">{reason.title}</h3>
                  </div>
                  <div className="w-16 h-1 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${reason.progress(streak)}%` }}
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {showingReason === reason.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 space-y-3"
                    >
                      <p className="text-sm text-gray-600">{reason.content}</p>
                      <p className="text-sm font-medium text-purple-600">
                        Try this instead: {reason.alternative}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SobrietySupport;
