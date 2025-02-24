import React from 'react';
import { 
  Zap, 
  RefreshCw, 
  ArrowRight, 
  Brain, 
  Phone,
  Clock,
  Coffee,
  Music
} from 'lucide-react';

/**
 * Coping strategies data
 * 
 * Collection of evidence-based techniques for managing urges
 */
export const copingStrategies = [
  {
    id: 'urge-surfing',
    title: 'Urge Surfing',
    icon: <Zap className="w-6 h-6 text-yellow-600" />,
    iconBg: 'bg-yellow-100',
    description: "Instead of fighting the urge, observe it like a wave. It will rise, peak, and eventually subside. Stay present and breathe through it.",
    steps: [
      "Find a quiet place to sit or lie down",
      "Notice where you feel the urge in your body",
      "Breathe deeply and observe the sensation without judgment",
      "Remind yourself that urges always pass, usually within 20-30 minutes",
      "Visualize yourself riding the wave of the urge until it subsides"
    ]
  },
  {
    id: 'distraction',
    title: 'Tactical Distraction',
    icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
    iconBg: 'bg-blue-100',
    description: "Shift your focus to a completely different activity that requires concentration.",
    steps: [
      "Choose an activity that requires focus (puzzle, exercise, cooking)",
      "Set a timer for 15-30 minutes",
      "Immerse yourself fully in the activity",
      "After the timer ends, reassess how you feel",
      "Extend the activity if needed or switch to another"
    ]
  },
  {
    id: 'play-forward',
    title: 'Play the Tape Forward',
    icon: <ArrowRight className="w-6 h-6 text-red-600" />,
    iconBg: 'bg-red-100',
    description: "Mentally visualize the entire sequence of what would happen if you gave in to the urge.",
    steps: [
      "Start by imagining the temporary relief of giving in",
      "Continue the mental movie to include the aftermath",
      "Visualize the guilt, physical symptoms, and regret",
      "Contrast this with how you'll feel tomorrow if you stay sober",
      "Remind yourself that the urge is temporary, but consequences last longer"
    ]
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness Meditation',
    icon: <Brain className="w-6 h-6 text-purple-600" />,
    iconBg: 'bg-purple-100',
    description: "Center yourself in the present moment through focused breathing and awareness.",
    steps: [
      "Find a comfortable position and close your eyes",
      "Focus on your breathing for 5 full breaths",
      "Scan your body for tension and release it",
      "Label your thoughts and feelings without judgment",
      "Return to your breath whenever your mind wanders"
    ]
  },
  {
    id: 'delay-technique',
    title: 'Delay Technique',
    icon: <Clock className="w-6 h-6 text-indigo-600" />,
    iconBg: 'bg-indigo-100',
    description: "Postpone the decision about whether to drink for a specific amount of time.",
    steps: [
      "When you feel an urge, make a deal with yourself to wait 20 minutes",
      "Set a timer for clarity and commitment",
      "During this time, engage in a different activity",
      "When the timer goes off, reassess your urge",
      "Repeat if necessary, extending the time"
    ]
  },
  {
    id: 'replacement-behavior',
    title: 'Replacement Behavior',
    icon: <Coffee className="w-6 h-6 text-amber-600" />,
    iconBg: 'bg-amber-100',
    description: "Substitute the drinking behavior with a healthier alternative that provides similar satisfaction.",
    steps: [
      "Identify what need alcohol fulfills (relaxation, social connection, etc.)",
      "Choose a healthy alternative that meets the same need",
      "Have your alternative readily available",
      "Practice using your replacement during triggering situations",
      "Notice the positive effects of the healthier choice"
    ]
  },
  {
    id: 'reach-out',
    title: 'Reach Out',
    icon: <Phone className="w-6 h-6 text-green-600" />,
    iconBg: 'bg-green-100',
    description: "Connect with someone supportive who understands your sobriety journey.",
    steps: [
      "Identify 3-5 people you can call when struggling",
      "Let them know in advance they're on your support team",
      "When an urge hits, call or text immediately",
      "Be honest about what you're experiencing",
      "Stay on the call until the urge subsides"
    ]
  },
  {
    id: 'self-talk',
    title: 'Positive Self-Talk',
    icon: <Music className="w-6 h-6 text-pink-600" />,
    iconBg: 'bg-pink-100',
    description: "Use encouraging, compassionate language with yourself to strengthen your resolve.",
    steps: [
      "Notice negative thoughts like 'One drink won't hurt'",
      "Challenge these thoughts with facts about your progress",
      "Replace with positive affirmations like 'I'm strong enough to handle this urge'",
      "Remind yourself of your reasons for sobriety",
      "Acknowledge your strength for recognizing and addressing the urge"
    ]
  }
];
