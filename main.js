{/* Mobile Urge Support Tab */}
        {activeTab === "urge-support" && (
          <Card>
            <CardContent className="p-4 space-y-4">
              {!isApiConfigured ? (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Sparkles className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">AI Support Available</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Enable personalized support by adding your Claude API key in settings.
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Configure API
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto mb-3 p-1">
                    {urgeSupportMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <MessageSquare className="w-8 h-8 text-purple-200 mb-3" />
                        <h3 className="text-sm font-medium mb-1">Urge Support</h3>
                        <p className="text-xs text-gray-500 max-w-md mb-4">
                          Get immediate support when experiencing an urge or craving.
                        </p>
                        <p className="text-xs text-gray-400">
                          Start typing below.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {urgeSupportMessages.map(msg => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[85%] rounded-lg p-2 text-sm ${
                                msg.role === 'user' 
                                  ? 'bg-purple-100 text-purple-900' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                    )}
                  </div>
                  
                  <form 
                    onSubmit={handleUrgeSupportSubmit} 
                    className="flex gap-2 border-t pt-3"
                  >
                    <Textarea
                      value={newUrgeSupportMessage}
                      onChange={(e) => setNewUrgeSupportMessage(e.target.value)}
                      placeholder="What are you feeling right now?"
                      className="flex-1 min-h-10 max-h-20 text-sm"
                      disabled={isProcessingUrgeMessage}
                    />
                    <Button 
                      type="submit" 
                      className="h-10"
                      disabled={!newUrgeSupportMessage.trim() || isProcessingUrgeMessage}
                      aria-label="Send message"
                    >
                      {isProcessingUrgeMessage ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-white" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        )}          {/* Urge Support Tab Content */}
          <TabsContent value="urge-support" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    <span>Real-Time Urge Support</span>
                  </CardTitle>
                  {urgeSupportMessages.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setUrgeSupportMessages([])}
                      aria-label="Clear chat history"
                    >
                      <RefreshCcw className="w-4 h-4 mr-1" />
                      New Chat
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {!isApiConfigured ? (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">AI Support Available</h3>
                    <p className="text-gray-600 mb-4">
                      Enable personalized AI support by adding your Anthropic API key in settings.
                    </p>
                    <Button 
                      onClick={() => setShowSettings(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configure API
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col h-[500px]">
                    <div className="flex-1 overflow-y-auto mb-4 p-2">
                      {urgeSupportMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                          <MessageSquare className="w-12 h-12 text-purple-200 mb-4" />
                          <h3 className="text-lg font-medium mb-2">Urge Support Assistant</h3>
                          <p className="text-gray-500 max-w-md mb-6">
                            When you're experiencing an urge, this assistant is here to provide immediate, 
                            supportive guidance to help you through the moment.
                          </p>
                          <p className="text-sm text-gray-400">
                            Type a message below to start the conversation.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {urgeSupportMessages.map(msg => (
                            <div 
                              key={msg.id} 
                              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  msg.role === 'user' 
                                    ? 'bg-purple-100 text-purple-900' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              </div>
                            </div>
                          ))}
                          <div ref={chatEndRef} />
                        </div>
                      )}
                    </div>
                    
                    <form 
                      onSubmit={handleUrgeSupportSubmit} 
                      className="flex gap-2 border-t pt-4"
                    >
                      <Textarea
                        value={newUrgeSupportMessage}
                        onChange={(e) => setNewUrgeSupportMessage(e.target.value)}
                        placeholder="Describe what you're feeling right now..."
                        className="flex-1 min-h-12 max-h-24"
                        disabled={isProcessingUrgeMessage || !isApiConfigured}
                      />
                      <Button 
                        type="submit" 
                        className="h-12 px-4"
                        disabled={!newUrgeSupportMessage.trim() || isProcessingUrgeMessage || !isApiConfigured}
                      >
                        {isProcessingUrgeMessage ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-white" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>  // Claude API Integration Functions
  
  // Call the Anthropic Claude API
  const callClaudeAPI = async (prompt, systemPrompt) => {
    if (!apiKey) {
      console.error("API key not configured");
      return null;
    }
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return null;
      }
      
      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error("Error calling Claude API:", error);
      return null;
    }
  };
  
  // Save API key and enable features
  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('claudeApiKey', apiKey);
      setIsApiConfigured(true);
      generatePersonalizedMessage();
      generateJournalPrompt();
      setMessage("AI personalization enabled successfully!");
    }
  };
  
  // Feature 1: Generate personalized motivational message
  const generatePersonalizedMessage = async () => {
    if (!isApiConfigured || !personalizationEnabled) return;
    
    setIsGeneratingMessage(true);
    
    // Create a context object with user data for the AI
    const userContext = {
      name: userName || "friend",
      sobrietyDays: calculateSobrietyDays(),
      journalEntries: journalEntries.slice(0, 5),
      mood: journalMood,
      triggers: triggers,
      timeOfDay: timeNow.getHours() < 12 ? "morning" : 
                 timeNow.getHours() < 18 ? "afternoon" : "evening"
    };
    
    const systemPrompt = `You are a compassionate AI assistant for a sobriety support app. Your role is to provide 
    encouraging, motivational messages that are personalized to the user's recovery journey.
    Keep messages concise (1-2 sentences), warm, and specific to their situation. 
    Don't mention alcohol or substances directly. Focus on strength, growth, and resilience.`;
    
    const prompt = `Please generate a personalized motivational message based on the following user information:
    
    User Name: ${userContext.name}
    Days Sober: ${userContext.sobrietyDays}
    Time of Day: ${userContext.timeOfDay}
    Current Mood: ${userContext.mood}
    
    Recent Journal Entries: ${
      userContext.journalEntries.length > 0 
        ? userContext.journalEntries.map(entry => `- ${entry.content.substring(0, 100)}... (Mood: ${entry.mood})`).join('\n')
        : "No recent entries"
    }
    
    Identified Triggers: ${
      userContext.triggers.length > 0
        ? userContext.triggers.map(trigger => trigger.name).join(', ')
        : "None identified yet"
    }
    
    Provide a single, encouraging message that feels personal and acknowledges their specific journey. Max 2 sentences.`;
    
    try {
      const message = await callClaudeAPI(prompt, systemPrompt);
      
      if (message) {
        // Add message to history and update display
        const newMessages = [...personalizedMessages, { 
          text: message, 
          timestamp: new Date().toISOString() 
        }];
        setPersonalizedMessages(newMessages);
        setMessage(message);
        
        // Store in localStorage
        localStorage.setItem('personalizedMessages', JSON.stringify(newMessages));
      }
    } catch (error) {
      console.error("Failed to generate personalized message:", error);
    } finally {
      setIsGeneratingMessage(false);
    }
  };
  
  // Feature 2: Generate journal prompts
  const generateJournalPrompt = async () => {
    if (!isApiConfigured || !personalizationEnabled) return;
    
    setIsGeneratingPrompt(true);
    
    const recentEntries = journalEntries.slice(0, 3).map(entry => entry.content);
    const recentMoods = journalEntries.slice(0, 5).map(entry => entry.mood);
    const moodCounts = recentMoods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";
    
    const systemPrompt = `You are an insightful AI assistant for a sobriety support app. Your role is to provide thought-provoking journal prompts 
    that help users reflect on their recovery journey in a meaningful way. Create prompts that encourage users to explore their emotions, 
    identify patterns, celebrate progress, and develop self-awareness.`;
    
    const prompt = `Generate a thoughtful journaling prompt for someone in recovery.
    
    Days Sober: ${calculateSobrietyDays()}
    Recent Journal Entries: ${recentEntries.length > 0 ? recentEntries.join(' | ') : "No recent entries"}
    Dominant Mood Recently: ${dominantMood}
    Identified Triggers: ${triggers.map(t => t.name).join(', ')}
    
    Make the prompt specific, reflective, and encouraging. Avoid directly mentioning substances.
    The prompt should help the user gain new insights about their journey.
    Keep it to 1-2 sentences maximum.

    Previously used prompts (avoid duplicating):
    ${usedJournalPrompts.join(' | ')}`;
    
    try {
      const prompt = await callClaudeAPI(prompt, systemPrompt);
      
      if (prompt) {
        setCurrentJournalPrompt(prompt);
        setUsedJournalPrompts([...usedJournalPrompts, prompt]);
        localStorage.setItem('usedJournalPrompts', JSON.stringify([...usedJournalPrompts, prompt]));
      }
    } catch (error) {
      console.error("Failed to generate journal prompt:", error);
    } finally {
      setIsGeneratingPrompt(false);
    }
  };
  
  // Apply the current prompt to the journal entry
  const applyJournalPrompt = () => {
    if (currentJournalPrompt) {
      setNewJournalEntry(`Prompt: ${currentJournalPrompt}\n\nMy thoughts: `);
      setShowJournalPrompts(false);
    }
  };
  
  // Feature 3: Urge support conversation
  const handleUrgeSupportSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!newUrgeSupportMessage.trim() || isProcessingUrgeMessage) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: newUrgeSupportMessage
    };
    
    setUrgeSupportMessages([...urgeSupportMessages, userMessage]);
    setNewUrgeSupportMessage('');
    setIsProcessingUrgeMessage(true);
    
    // Build context for the API
    const chatHistory = urgeSupportMessages
      .slice(-6) // Get last 6 messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    const systemPrompt = `You are a compassionate AI assistant for a sobriety support app, specifically helping users through moments of urges or cravings.
    Provide supportive, non-judgmental responses that help the user manage their current urge. Your messages should be:
    
    1. Empathetic and compassionate
    2. Helpful with immediate, practical coping techniques
    3. Brief and focused (1-3 sentences maximum)
    4. Encouraging of their strength and commitment
    5. Focused on the present moment
    
    Your goal is to help them work through the urge in real-time with evidence-based approaches like urge surfing, 
    distraction techniques, or reframing thoughts. Never suggest using substances in moderation. 
    Always assume they want to maintain their recovery.`;
    
    const prompt = `User is currently experiencing an urge and needs immediate support.
    
    User details:
    - Days sober: ${calculateSobrietyDays()}
    - Time of day: ${timeNow.getHours() < 12 ? "morning" : timeNow.getHours() < 18 ? "afternoon" : "evening"}
    
    Recent conversation:
    ${chatHistory ? chatHistory : "This is the start of the conversation."}
    
    User's current message: ${newUrgeSupportMessage}
    
    Provide a supportive, practical response focused on helping them through this moment. Keep it conversational and brief.`;
    
    try {
      const response = await callClaudeAPI(prompt, systemPrompt);
      
      if (response) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: response
        };
        
        setUrgeSupportMessages([...urgeSupportMessages, userMessage, assistantMessage]);
        
        // Record that user used urge support for potential streak bonuses
        setPositiveChoices(prev => prev + 1);
      }
    } catch (error) {
      console.error("Failed to get urge support response:", error);
      // Add a fallback message if API fails
      const fallbackMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm here with you. This urge is temporary and will pass. Take a few deep breaths and remember why your recovery matters to you."
      };
      setUrgeSupportMessages([...urgeSupportMessages, userMessage, fallbackMessage]);
    } finally {
      setIsProcessingUrgeMessage(false);
    }
  };import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '@/components/ui/tooltip';
import { 
  Heart, Brain, Wallet, Sun, Moon, Battery, Clock, 
  CheckCircle, Shield, Phone, Medal, Trophy, Calendar,
  UserCircle, Settings, ChevronDown, ChevronUp, MessageCircle,
  Bell, AlertTriangle, ArrowRight, BarChart, Zap, BookOpen,
  Save, RefreshCw, X, Menu, PlusCircle, ThumbsUp, Users,
  TrendingUp, Share2, Info, HelpCircle, MoreHorizontal, Eye,
  Send, Sparkles, Lightbulb, MessageSquare, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SobrietySupport - A comprehensive dashboard for maintaining sobriety
 * 
 * Features:
 * - Personalized dashboard with streak tracking
 * - Time-adaptive motivational messages
 * - Detailed health, mental, and financial benefit tracking
 * - Emergency support resources
 * - Journal for reflection and trigger identification
 * - Coping techniques library
 * - Community connection resources
 * - Detailed progress analytics
 */
const SobrietySupport = () => {
  // Core state variables
  const [timeNow, setTimeNow] = useState(new Date());
  const [showingReason, setShowingReason] = useState(null);
  const [positiveChoices, setPositiveChoices] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [message, setMessage] = useState('Every moment of strength matters.');
  
  // Enhanced state variables
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState('');
  const [sobrietyDate, setSobrietyDate] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [journalMood, setJournalMood] = useState('neutral');
  const [triggers, setTriggers] = useState([]);
  const [newTrigger, setNewTrigger] = useState('');
  const [triggerIntensity, setTriggerIntensity] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTriggerAlert, setShowTriggerAlert] = useState(false);
  const [selectedCopingStrategy, setSelectedCopingStrategy] = useState(null);
  
  // UI improvement state variables
  const [showingAllBenefits, setShowingAllBenefits] = useState(null);
  const [showAllJournalEntries, setShowAllJournalEntries] = useState(false);
  const [dailyPrompt, setDailyPrompt] = useState('');
  const [customGoals, setCustomGoals] = useState([]);
  
  // Claude AI integration state variables
  const [apiKey, setApiKey] = useState('');
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [personalizedMessages, setPersonalizedMessages] = useState([]);
  const [currentJournalPrompt, setCurrentJournalPrompt] = useState('');
  const [showJournalPrompts, setShowJournalPrompts] = useState(false);
  const [usedJournalPrompts, setUsedJournalPrompts] = useState([]);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  
  // Urge support chat state
  const [showUrgeSupport, setShowUrgeSupport] = useState(false);
  const [urgeSupportMessages, setUrgeSupportMessages] = useState([]);
  const [newUrgeSupportMessage, setNewUrgeSupportMessage] = useState('');
  const [isProcessingUrgeMessage, setIsProcessingUrgeMessage] = useState(false);
  const chatEndRef = useRef(null);
  
  // Refs
  const lastInteractionRef = useRef(Date.now());
  const timerRef = useRef(null);
  
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatEndRef.current && showUrgeSupport) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [urgeSupportMessages, showUrgeSupport]);

  // Initial load effect
  useEffect(() => {
    // Optimized time update interval - only updates when hour changes
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() !== timeNow.getHours()) {
        setTimeNow(now);
      }
    }, 300000); // Check every 5 minutes instead of every minute
    
    // Load all saved data from localStorage
    loadUserData();
    
    // Check if it's a new day to update streak
    checkAndUpdateStreak();
    
    // Set up check-in reminder
    setupCheckInReminder();
    
    // Request notification permission if not already granted
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      // We'll wait for user interaction before requesting
      const handleFirstInteraction = () => {
        Notification.requestPermission();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
      
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
    }
    
    // Generate initial AI content if API is configured
    const storedApiKey = localStorage.getItem('claudeApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsApiConfigured(true);
      generatePersonalizedMessage();
      generateJournalPrompt();
    }
    
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  // Save data when important state changes
  useEffect(() => {
    saveUserData();
  }, [streak, achievements, userName, sobrietyDate, journalEntries, triggers]);
  
  // Load all user data from localStorage
  const loadUserData = () => {
    try {
      // Core data
      const storedStreak = localStorage.getItem('sobrietyStreak');
      const storedAchievements = localStorage.getItem('achievements');
      const storedPositiveChoices = localStorage.getItem('positiveChoices');
      
      // Enhanced data
      const storedUserName = localStorage.getItem('userName');
      const storedSobrietyDate = localStorage.getItem('sobrietyDate');
      const storedJournalEntries = localStorage.getItem('journalEntries');
      const storedTriggers = localStorage.getItem('triggers');
      const storedLastCheckDate = localStorage.getItem('lastCheckDate');
      const storedApiKey = localStorage.getItem('claudeApiKey');
      const storedPersonalizedMessages = localStorage.getItem('personalizedMessages');
      const storedUsedJournalPrompts = localStorage.getItem('usedJournalPrompts');
      
      // Set state from stored values with error handling
      if (storedStreak) setStreak(parseInt(storedStreak, 10) || 0);
      
      if (storedAchievements) {
        try {
          setAchievements(JSON.parse(storedAchievements));
        } catch (e) {
          console.error("Error parsing achievements:", e);
          setAchievements([]);
        }
      }
      
      if (storedPositiveChoices) setPositiveChoices(parseInt(storedPositiveChoices, 10) || 0);
      if (storedUserName) setUserName(storedUserName);
      
      // Validate sobriety date - ensure it's not in the future
      if (storedSobrietyDate) {
        const date = new Date(storedSobrietyDate);
        if (date <= new Date()) {
          setSobrietyDate(storedSobrietyDate);
        } else {
          setSobrietyDate('');
          console.warn("Future sobriety date detected and reset");
        }
      }
      
      if (storedJournalEntries) {
        try {
          setJournalEntries(JSON.parse(storedJournalEntries));
        } catch (e) {
          console.error("Error parsing journal entries:", e);
          setJournalEntries([]);
        }
      }
      
      if (storedTriggers) {
        try {
          setTriggers(JSON.parse(storedTriggers));
        } catch (e) {
          console.error("Error parsing triggers:", e);
          setTriggers([]);
        }
      }
      
      // Claude API integration data
      if (storedApiKey) {
        setApiKey(storedApiKey);
        setIsApiConfigured(true);
      }
      
      if (storedPersonalizedMessages) {
        try {
          setPersonalizedMessages(JSON.parse(storedPersonalizedMessages));
        } catch (e) {
          console.error("Error parsing personalized messages:", e);
          setPersonalizedMessages([]);
        }
      }
      
      if (storedUsedJournalPrompts) {
        try {
          setUsedJournalPrompts(JSON.parse(storedUsedJournalPrompts));
        } catch (e) {
          console.error("Error parsing used journal prompts:", e);
          setUsedJournalPrompts([]);
        }
      }
      
      // Additional validation
      if (storedLastCheckDate) {
        try {
          // Validate that it's actually a valid date string
          new Date(storedLastCheckDate).toDateString();
        } catch (e) {
          localStorage.setItem('lastCheckDate', new Date().toDateString());
        }
      }
    } catch (e) {
      console.error("Error loading user data:", e);
      setMessage("There was an issue loading your data. Some information may have been reset.");
    }
  };
  
  // Save all user data to localStorage
  const saveUserData = () => {
    localStorage.setItem('sobrietyStreak', streak);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('positiveChoices', positiveChoices);
    localStorage.setItem('userName', userName);
    localStorage.setItem('sobrietyDate', sobrietyDate);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    localStorage.setItem('triggers', JSON.stringify(triggers));
    localStorage.setItem('personalizedMessages', JSON.stringify(personalizedMessages));
    localStorage.setItem('usedJournalPrompts', JSON.stringify(usedJournalPrompts));
    
    // Save API key if configured
    if (apiKey) {
      localStorage.setItem('claudeApiKey', apiKey);
    }
  };
  
  // Check if it's a new day and update the streak accordingly
  const checkAndUpdateStreak = () => {
    const lastCheckDate = localStorage.getItem('lastCheckDate');
    const today = new Date().toDateString();
    
    if (lastCheckDate !== today) {
      // It's a new day, increment streak if within 48 hours of last check
      const lastCheck = lastCheckDate ? new Date(lastCheckDate) : null;
      const now = new Date();
      
      if (!lastCheck || (now - lastCheck) < (48 * 60 * 60 * 1000)) {
        // Less than 48 hours since last check, increment streak
        setStreak(prev => {
          const newStreak = prev + 1;
          checkForMilestones(newStreak);
          return newStreak;
        });
      } else {
        // More than 48 hours, reset streak
        setStreak(1);
        setMessage("Welcome back! Every new beginning is important.");
      }
      
      localStorage.setItem('lastCheckDate', today);
    }
  };
  
  // Setup a reminder to check in
  const setupCheckInReminder = () => {
    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Set reminder for 8 hours after last interaction
    timerRef.current = setTimeout(() => {
      const notificationPermission = Notification.permission;
      
      if (notificationPermission === "granted") {
        new Notification("Sobriety Check-In", {
          body: "It's been a while. How are you feeling today?",
          icon: "/favicon.ico"
        });
      }
      
      // Set a visual indicator in the app
      setMessage("How are you feeling now? Consider a quick journal entry.");
    }, 8 * 60 * 60 * 1000); // 8 hours
  };
  
  // User interaction handler - resets the check-in timer
  const handleUserInteraction = () => {
    lastInteractionRef.current = Date.now();
    setupCheckInReminder();
  };
  
  // Check for achievement milestones
  const checkForMilestones = (currentStreak) => {
    const milestone = milestones.find(m => m.days === currentStreak);
    
    if (milestone && !achievements.includes(milestone.badge)) {
      const newAchievements = [...achievements, milestone.badge];
      setAchievements(newAchievements);
      setMessage(milestone.message);
      
      // Show notification
      if (Notification.permission === "granted") {
        new Notification("Achievement Unlocked!", {
          body: milestone.message,
          icon: "/favicon.ico"
        });
      }
    }
  };

  // Milestone achievements
  const milestones = [
    { days: 1, badge: '🌱', message: 'First Day Champion!' },
    { days: 7, badge: '🌟', message: 'One Week Strong!' },
    { days: 30, badge: '🏆', message: 'Monthly Milestone Master!' },
    { days: 90, badge: '💫', message: 'Quarterly Quest Complete!' },
    { days: 180, badge: '🌈', message: 'Half Year of Healing!' },
    { days: 365, badge: '👑', message: 'Year of Transformation!' }
  ];

  // Health, mental, and financial benefits
  const reasons = [
    {
      id: 'health',
      title: 'Regenerating Your Body from Within',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      content: "Your liver is not just filtering toxins; it's actively regenerating new cells. By abstaining, you're giving it the chance to repair years of damage, potentially reversing fatty liver disease and significantly lowering cancer risks. Your immune system is recalibrating, inflammation is reducing, and your cardiovascular system is recovering from alcohol-induced strain.",
      alternative: "Fuel your body with nutrient-rich foods and hydration. Your cells are thanking you.",
      progress: (days) => Math.min(100, days * 0.5),
      benefits: [
        { day: 1, title: "Blood Sugar Stabilizes" },
        { day: 3, title: "Improved Hydration" },
        { day: 7, title: "Better Sleep Patterns" },
        { day: 14, title: "Reduced Liver Fat" },
        { day: 30, title: "Lower Blood Pressure" },
        { day: 90, title: "Immune System Boost" },
        { day: 365, title: "Significantly Lower Cancer Risk" }
      ]
    },
    {
      id: 'clarity',
      title: 'Unlocking Mental Potential',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      content: "Alcohol disrupts neuroplasticity, the brain's ability to rewire and adapt. By choosing sobriety, you're allowing your cognitive functions to sharpen. Memory retention improves, emotional regulation strengthens, and your capacity for deep thought and creativity expands. You're actively restoring your brain's ability to function at its highest potential.",
      alternative: "Engage in learning something new—whether it's a language, an instrument, or a concept. Your mind is your greatest asset.",
      progress: (days) => Math.min(100, days * 0.3),
      benefits: [
        { day: 1, title: "Mental Fog Lifting" },
        { day: 7, title: "Improved Concentration" },
        { day: 14, title: "Better Memory Formation" },
        { day: 30, title: "Enhanced Problem Solving" },
        { day: 60, title: "Emotional Regulation" },
        { day: 90, title: "Renewed Creativity" },
        { day: 180, title: "Neural Pathway Rewiring" }
      ]
    },
    {
      id: 'financial',
      title: 'Wealth Beyond Money',
      icon: <Wallet className="w-8 h-8 text-green-500" />,
      content: "Sobriety isn't just about saving money; it's about investing in your future. Every dollar not spent on alcohol is an opportunity—a class you can take, an experience you can have, a skill you can develop. Beyond financial savings, you're also reclaiming time and energy that can be redirected towards self-growth and meaningful relationships.",
      alternative: "Create a vision board of your financial and personal goals. Watch how they manifest when you commit to them.",
      progress: (days) => Math.min(100, days * 0.4),
      benefits: [
        { day: 7, title: "First Week Savings" },
        { day: 30, title: "Monthly Budget Freedom" },
        { day: 90, title: "New Opportunity Fund" },
        { day: 180, title: "Reclaimed Time Value" },
        { day: 365, title: "Annual Wealth Building" }
      ]
    },
    {
      id: 'relationships',
      title: 'Authentic Connections',
      icon: <Users className="w-8 h-8 text-purple-500" />,
      content: "Sobriety creates space for deeper, more meaningful relationships. By showing up authentically, you'll discover who truly values your presence. Your communication becomes clearer, your empathy deepens, and your capacity for genuine connection expands. Old relationships may transform, and new ones will form on stronger foundations.",
      alternative: "Reach out to someone you care about today. Share something meaningful rather than just small talk.",
      progress: (days) => Math.min(100, days * 0.25),
      benefits: [
        { day: 14, title: "Improved Communication" },
        { day: 30, title: "Conflict Resolution Skills" },
        { day: 60, title: "Deeper Empathy" },
        { day: 90, title: "Authentic Vulnerability" },
        { day: 180, title: "Relationship Rebuilding" },
        { day: 365, title: "Building Trust" }
      ]
    }
  ];

  // Coping strategies
  const copingStrategies = [
    {
      id: 'urge-surfing',
      title: 'Urge Surfing',
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
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
      icon: <RefreshCw className="w-6 h-6 text-blue-500" />,
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
      icon: <ArrowRight className="w-6 h-6 text-red-500" />,
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
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      description: "Center yourself in the present moment through focused breathing and awareness.",
      steps: [
        "Find a comfortable position and close your eyes",
        "Focus on your breathing for 5 full breaths",
        "Scan your body for tension and release it",
        "Label your thoughts and feelings without judgment",
        "Return to your breath whenever your mind wanders"
      ]
    }
  ];

  // Emergency support contacts
  const emergencyContacts = [
    { name: 'National Crisis Hotline', number: '988' },
    { name: 'AA 24/7 Hotline', number: '1-800-839-1686' },
    { name: 'SAMHSA Helpline', number: '1-800-662-4357' }
  ];

  // Community resources
  const communityResources = [
    { 
      name: 'Alcoholics Anonymous',
      description: 'Find local meetings and online support groups.',
      url: 'https://www.aa.org/find-aa',
      icon: <Users className="w-5 h-5" />
    },
    { 
      name: 'SMART Recovery',
      description: 'Science-based addiction recovery support program.',
      url: 'https://www.smartrecovery.org/',
      icon: <Brain className="w-5 h-5" />
    },
    { 
      name: 'r/stopdrinking',
      description: 'Supportive online Reddit community with over 400k members.',
      url: 'https://www.reddit.com/r/stopdrinking/',
      icon: <MessageCircle className="w-5 h-5" />
    }
  ];

  // Handle reason card click
  const handleReasonClick = (reasonId) => {
    if (showingReason === reasonId) {
      setShowingReason(null);
    } else {
      setShowingReason(reasonId);
      setPositiveChoices(prev => {
        const newValue = prev + 1;
        localStorage.setItem('positiveChoices', newValue);
        return newValue;
      });
      
      // Record interaction
      handleUserInteraction();
    }
  };

  // Add a new journal entry
  const addJournalEntry = () => {
    if (newJournalEntry.trim()) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString(),
        content: newJournalEntry,
        mood: journalMood
      };
      
      setJournalEntries(prev => [entry, ...prev]);
      setNewJournalEntry('');
      setJournalMood('neutral');
      
      // Record interaction
      handleUserInteraction();
      setMessage("Great job reflecting. Self-awareness builds resilience.");
    }
  };

  // Add a new trigger
  const addTrigger = () => {
    if (newTrigger.trim()) {
      const trigger = {
        id: Date.now(),
        name: newTrigger,
        intensity: triggerIntensity,
        dateAdded: new Date().toISOString()
      };
      
      setTriggers(prev => [trigger, ...prev]);
      setNewTrigger('');
      setTriggerIntensity(5);
      
      // Record interaction
      handleUserInteraction();
      setMessage("Identifying triggers helps build your defense strategy.");
    }
  };

  // Get time-based message
  const getTimeMessage = () => {
    const hour = timeNow.getHours();
    
    if (hour < 5) return { 
      icon: <Moon className="w-8 h-8 text-indigo-600" />, 
      message: "The quiet hours are a time for deep rest. You're doing great." 
    };
    if (hour < 12) return { 
      icon: <Sun className="w-8 h-8 text-yellow-400" />, 
      message: "Good morning. Each new day is a fresh opportunity." 
    };
    if (hour < 17) return { 
      icon: <Sun className="w-8 h-8 text-orange-400" />, 
      message: "Afternoon check-in. Stay present with your intentions." 
    };
    if (hour < 21) return { 
      icon: <Moon className="w-8 h-8 text-indigo-400" />, 
      message: "Evening is here. You've made it through another day strong." 
    };
    return { 
      icon: <Moon className="w-8 h-8 text-indigo-600" />, 
      message: "Winding down. Reflect on today's victories, no matter how small." 
    };
  };

  // Calculate days since sobriety date
  const calculateSobrietyDays = () => {
    if (!sobrietyDate) return streak;
    
    const startDate = new Date(sobrietyDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get mood emoji
  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'great': return '😄';
      case 'good': return '🙂';
      case 'neutral': return '😐';
      case 'difficult': return '😕';
      case 'struggling': return '😣';
      default: return '😐';
    }
  };

  // Get current time message
  const timeMessage = getTimeMessage();

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center mb-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-5 h-5 mr-1" />
          Menu
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="w-4 h-4 mr-1" />
          Settings
        </Button>
      </div>

      {/* Responsive Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white rounded-lg shadow-md overflow-hidden mb-4"
          >
            <div className="p-2">
              <Button
                variant={activeTab === 'dashboard' ? "default" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              
              <Button
                variant={activeTab === 'journal' ? "default" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => {
                  setActiveTab('journal');
                  setMobileMenuOpen(false);
                }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Journal
              </Button>
              
              <Button
                variant={activeTab === 'triggers' ? "default" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => {
                  setActiveTab('triggers');
                  setMobileMenuOpen(false);
                }}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Triggers
              </Button>
              
              <Button
                variant={activeTab === 'coping' ? "default" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => {
                  setActiveTab('coping');
                  setMobileMenuOpen(false);
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Coping Tools
              </Button>
              
              <Button
                variant={activeTab === 'community' ? "default" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => {
                  setActiveTab('community');
                  setMobileMenuOpen(false);
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
              
              <Button
                variant={activeTab === 'urge-support' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('urge-support');
                  setMobileMenuOpen(false);
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Urge Support
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-blue-200 bg-blue-50 mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-blue-700">Personal Settings</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="max-w-xs"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Sobriety Start Date</label>
                  <Input
                    type="date"
                    value={sobrietyDate}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const today = new Date();
                      
                      if (selectedDate > today) {
                        setMessage("Please select a date in the past.");
                        return;
                      }
                      setSobrietyDate(e.target.value);
                    }}
                    className="max-w-xs"
                    max={new Date().toISOString().split('T')[0]} // Prevent future dates
                    aria-label="Set your sobriety start date"
                  />
                </div>
                
                {/* Claude API Integration Section */}
                <div className="border-t border-blue-200 pt-4">
                  <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Personalization
                  </h3>
                  
                  {!isApiConfigured ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Enable personalized messages, journal prompts, and real-time support by adding your Anthropic API key.
                      </p>
                      <Input
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Claude API key"
                        type="password"
                        className="max-w-xs"
                      />
                      <Button 
                        onClick={saveApiKey}
                        disabled={!apiKey}
                        className="mt-2"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Enable AI Features
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AI Personalization</span>
                        <Badge variant="outline" className="bg-green-50 text-green-600">Enabled</Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setPersonalizationEnabled(!personalizationEnabled);
                          }}
                        >
                          {personalizationEnabled ? (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Disable
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Enable
                            </>
                          )}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setApiKey('');
                            setIsApiConfigured(false);
                            localStorage.removeItem('claudeApiKey');
                          }}
                        >
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Reset API Key
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Notification Permissions</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (Notification.permission !== "granted") {
                        Notification.requestPermission();
                      }
                    }}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    {Notification.permission === "granted" 
                      ? "Notifications Enabled" 
                      : "Enable Notifications"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {timeMessage.icon}
              <div>
                <h2 className="text-xl font-semibold">{timeMessage.message}</h2>
                {userName && <p className="text-gray-600">Welcome back, {userName}</p>}
              </div>
            </div>
            
            <div className="hidden md:flex">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-red-50 hover:bg-red-100 text-red-600"
                onClick={() => setShowEmergency(prev => !prev)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Emergency Support
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-red-50 hover:bg-red-100 text-red-600"
                onClick={() => setShowEmergency(prev => !prev)}
              >
                <Shield className="w-4 h-4 mr-1" />
                Help
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              {isGeneratingMessage ? (
                <div className="flex items-center animate-pulse text-purple-600">
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>Personalizing your message...</span>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium text-purple-700">{message}</p>
                  {isApiConfigured && personalizationEnabled && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-purple-600"
                      onClick={generatePersonalizedMessage} 
                      aria-label="Generate new message"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-gray-500">
                Streak: <strong>{sobrietyDate ? calculateSobrietyDays() : streak} days</strong>
              </p>
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

      {/* Emergency Support Card */}
      <AnimatePresence>
        {showEmergency && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-red-700">24/7 Support Available</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => setShowEmergency(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
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
                  <div className="pt-2 text-sm text-red-700">
                    <p>If you're experiencing an immediate emergency, please call 911.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Tab Navigation */}
      <div className="hidden md:block">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="dashboard">
              <BarChart className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="journal">
              <BookOpen className="w-4 h-4 mr-2" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="triggers">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Triggers
            </TabsTrigger>
            <TabsTrigger value="coping">
              <Zap className="w-4 h-4 mr-2" />
              Coping Tools
            </TabsTrigger>
            <TabsTrigger value="community">
              <Users className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger value="urge-support">
              <MessageSquare className="w-4 h-4 mr-2" />
              Urge Support
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="mt-4">
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
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleReasonClick(reason.id);
                      }
                    }}
                    role="button"
                    aria-expanded={showingReason === reason.id}
                    aria-controls={`reason-content-${reason.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {reason.icon}
                          <h3 className="font-medium">{reason.title}</h3>
                        </div>
                        
                        <div className="w-24">
                          <Progress 
                            value={reason.progress(calculateSobrietyDays())} 
                            className="h-2"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(reason.progress(calculateSobrietyDays()))}
                            aria-label={`${reason.title} progress: ${Math.round(reason.progress(calculateSobrietyDays()))}%`}
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
                            id={`reason-content-${reason.id}`}
                          >
                            <p className="text-sm text-gray-600">{reason.content}</p>
                            
                            <div className="border-t border-b border-gray-100 py-2 my-3">
                              <h4 className="text-sm font-medium mb-2">Timeline of Benefits:</h4>
                              <div className="space-y-1">
                                {reason.benefits.map((benefit, idx) => {
                                  const achieved = calculateSobrietyDays() >= benefit.day;
                                  return (
                                    <div 
                                      key={idx} 
                                      className={`flex items-center gap-2 text-sm ${
                                        achieved ? 'text-green-600' : 'text-gray-500'
                                      }`}
                                    >
                                      {achieved ? (
                                        <CheckCircle className="w-4 h-4" aria-hidden="true" />
                                      ) : (
                                        <Clock className="w-4 h-4" aria-hidden="true" />
                                      )}
                                      <span>
                                        Day {benefit.day}: {benefit.title}
                                        {achieved && <span className="sr-only"> (achieved)</span>}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <p className="text-sm font-medium text-purple-700">
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
          </TabsContent>
          
          {/* Journal Tab Content */}
          <TabsContent value="journal" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Reflection Journal</CardTitle>
                  
                  {isApiConfigured && personalizationEnabled && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowJournalPrompts(!showJournalPrompts)}
                      className="text-purple-600 flex items-center gap-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showJournalPrompts ? "Hide Prompts" : "Get Prompts"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI Journal Prompts */}
                <AnimatePresence>
                  {showJournalPrompts && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-purple-50 p-4 rounded-md mb-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-purple-800 mb-1">Reflection Prompt</h3>
                            {isGeneratingPrompt ? (
                              <div className="animate-pulse text-purple-600 text-sm">
                                Generating thoughtful prompt...
                              </div>
                            ) : (
                              <p className="text-sm text-purple-700">{currentJournalPrompt || "No prompt available yet."}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={generateJournalPrompt}
                            disabled={isGeneratingPrompt}
                            className="h-8 w-8 p-0"
                            aria-label="Generate new prompt"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={applyJournalPrompt}
                            disabled={!currentJournalPrompt || isGeneratingPrompt}
                            className="h-8"
                          >
                            Use Prompt
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="space-y-2">
                  <Textarea
                    placeholder="How are you feeling today? What triggers or victories have you experienced?"
                    value={newJournalEntry}
                    onChange={(e) => setNewJournalEntry(e.target.value)}
                    className="min-h-32"
                  />
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">Mood:</span>
                    {['great', 'good', 'neutral', 'difficult', 'struggling'].map((mood) => (
                      <Badge
                        key={mood}
                        variant={journalMood === mood ? "default" : "outline"}
                        className={`cursor-pointer ${
                          journalMood === mood ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : ''
                        }`}
                        onClick={() => setJournalMood(mood)}
                      >
                        {getMoodEmoji(mood)} {mood}
                      </Badge>
                    ))}
                    
                    <div className="ml-auto">
                      <Button onClick={addJournalEntry}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Entry
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Previous Entries</h3>
                  
                  {journalEntries.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No journal entries yet. Start tracking your journey today.</p>
                  )}
                  
                  {journalEntries.map((entry) => (
                    <Card key={entry.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                          <Badge variant="outline">{getMoodEmoji(entry.mood)} {entry.mood}</Badge>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Triggers Tab Content */}
          <TabsContent value="triggers" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Trigger Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add a New Trigger:</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Describe a trigger (event, feeling, place, etc.)"
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                    />
                    <div className="flex-none w-32">
                      <select
                        value={triggerIntensity}
                        onChange={(e) => setTriggerIntensity(parseInt(e.target.value, 10))}
                        className="w-full rounded-md border border-gray-300 p-2"
                      >
                        <option value="1">Very Low</option>
                        <option value="3">Low</option>
                        <option value="5">Medium</option>
                        <option value="7">High</option>
                        <option value="9">Very High</option>
                      </select>
                    </div>
                    <Button onClick={addTrigger}>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Your Identified Triggers</h3>
                  
                  {triggers.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No triggers identified yet. Add your first one to develop coping strategies.</p>
                  )}
                  
                  {triggers.map((trigger) => (
                    <Card key={trigger.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{trigger.name}</h4>
                            <p className="text-sm text-gray-500">Added: {formatDate(trigger.dateAdded)}</p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant="outline" 
                              className={`${
                                trigger.intensity >= 7 ? 'bg-red-50 text-red-700' :
                                trigger.intensity >= 4 ? 'bg-yellow-50 text-yellow-700' :
                                'bg-green-50 text-green-700'
                              }`}
                            >
                              Intensity: {trigger.intensity}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Coping Tools Tab Content */}
          <TabsContent value="coping" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Coping Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {copingStrategies.map((strategy) => (
                    <Card 
                      key={strategy.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedCopingStrategy === strategy.id ? 'bg-purple-50 border-purple-200' : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCopingStrategy(
                        selectedCopingStrategy === strategy.id ? null : strategy.id
                      )}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedCopingStrategy(
                            selectedCopingStrategy === strategy.id ? null : strategy.id
                          );
                        }
                      }}
                      role="button"
                      aria-expanded={selectedCopingStrategy === strategy.id}
                      aria-controls={`strategy-content-${strategy.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          {strategy.icon}
                          <h3 className="font-medium">{strategy.title}</h3>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                        
                        <AnimatePresence>
                          {selectedCopingStrategy === strategy.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden"
                              id={`strategy-content-${strategy.id}`}
                            >
                              <ol className="list-decimal list-inside space-y-1 text-sm pl-1">
                                {strategy.steps.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ol>
                              <div className="mt-4 flex justify-end">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const message = `I used the ${strategy.title} technique today and it helped me stay on track.`;
                                    setNewJournalEntry(message);
                                    setActiveTab('journal');
                                  }}
                                  aria-label={`Log success using ${strategy.title} technique`}
                                >
                                  <ThumbsUp className="w-3 h-3 mr-2" />
                                  Log Success
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Community Tab Content */}
          <TabsContent value="community" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Community Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Connecting with others who understand your journey can be a powerful part of maintaining sobriety.
                  Here are some resources to help you find support.
                </p>
                
                <div className="space-y-4">
                  {communityResources.map((resource) => (
                    <Card key={resource.name} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-white p-2 rounded-full">
                            {resource.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            <a 
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              Visit Resource
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <h3 className="font-medium text-blue-700 mb-2">Local Support Groups</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Finding local, in-person support can be invaluable. Use these resources to locate meetings in your area.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <a 
                        href="https://www.aa.org/find-aa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Find AA Meetings Near You
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <a 
                        href="https://www.smartrecovery.org/meetings/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Find SMART Recovery Meetings
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mobile Tab Content - Show based on activeTab state */}
      <div className="md:hidden">
        {activeTab === "dashboard" && (
          <div className="grid gap-4">
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
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleReasonClick(reason.id);
                    }
                  }}
                  role="button"
                  aria-expanded={showingReason === reason.id}
                  aria-controls={`mobile-reason-content-${reason.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {reason.icon}
                        <h3 className="font-medium text-sm">{reason.title}</h3>
                      </div>
                      
                      <div className="w-20">
                        <Progress 
                          value={reason.progress(calculateSobrietyDays())} 
                          className="h-2"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(reason.progress(calculateSobrietyDays()))}
                          aria-label={`${reason.title} progress: ${Math.round(reason.progress(calculateSobrietyDays()))}%`}
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
                          id={`mobile-reason-content-${reason.id}`}
                        >
                          <p className="text-sm text-gray-600">{reason.content}</p>
                          
                          <div className="border-t border-b border-gray-100 py-2 my-3">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium">Progress:</h4>
                              
                              {/* Show all benefits button */}
                              {reason.benefits.length > 3 && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs h-6 px-2 text-blue-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Toggle showing all benefits or just the first 3
                                    setShowingAllBenefits(prev => prev === reason.id ? null : reason.id);
                                  }}
                                  aria-label={showingAllBenefits === reason.id ? "Show fewer benefits" : "Show all benefits"}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  {showingAllBenefits === reason.id ? "Show Less" : "Show All"}
                                </Button>
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              {reason.benefits
                                .filter((benefit, idx) => {
                                  // Show all if showingAllBenefits is set to this reason's id
                                  if (showingAllBenefits === reason.id) return true;
                                  // Otherwise show first 3 or any achieved ones
                                  return idx < 3 || calculateSobrietyDays() >= benefit.day;
                                })
                                .map((benefit, idx) => {
                                  const achieved = calculateSobrietyDays() >= benefit.day;
                                  return (
                                    <div 
                                      key={idx} 
                                      className={`flex items-center gap-2 text-xs ${
                                        achieved ? 'text-green-600' : 'text-gray-500'
                                      }`}
                                    >
                                      {achieved ? (
                                        <CheckCircle className="w-3 h-3" aria-hidden="true" />
                                      ) : (
                                        <Clock className="w-3 h-3" aria-hidden="true" />
                                      )}
                                      <span>
                                        Day {benefit.day}: {benefit.title}
                                        {achieved && <span className="sr-only"> (achieved)</span>}
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          
                          <p className="text-xs font-medium text-purple-700">
                            Try this: {reason.alternative}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Journal Tab - Mobile */}
        {activeTab === "journal" && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <Textarea
                placeholder="How are you feeling today?"
                value={newJournalEntry}
                onChange={(e) => setNewJournalEntry(e.target.value)}
                className="min-h-24"
                aria-label="Journal entry text"
              />
              
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium">Mood:</span>
                <div className="flex flex-wrap gap-1">
                  {['great', 'good', 'neutral', 'difficult', 'struggling'].map((mood) => (
                    <Badge
                      key={mood}
                      variant={journalMood === mood ? "default" : "outline"}
                      className={`cursor-pointer text-xs ${
                        journalMood === mood ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : ''
                      }`}
                      onClick={() => setJournalMood(mood)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setJournalMood(mood);
                        }
                      }}
                      tabIndex={0}
                      role="radio"
                      aria-checked={journalMood === mood}
                      aria-label={`Mood: ${mood}`}
                    >
                      {getMoodEmoji(mood)} {mood}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button onClick={addJournalEntry} className="w-full" aria-label="Save journal entry">
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
              
              <div className="space-y-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">Previous Entries</h3>
                  
                  {journalEntries.length > 3 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-6 px-2 text-blue-600"
                      onClick={() => setShowAllJournalEntries(!showAllJournalEntries)}
                      aria-label={showAllJournalEntries ? "Show fewer entries" : "View all entries"}
                    >
                      {showAllJournalEntries ? "Show Less" : `View All (${journalEntries.length})`}
                    </Button>
                  )}
                </div>
                
                {journalEntries.length === 0 && (
                  <p className="text-gray-500 text-xs italic">No entries yet.</p>
                )}
                
                {(showAllJournalEntries ? journalEntries : journalEntries.slice(0, 3)).map((entry) => (
                  <Card key={entry.id} className="bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-500">{formatDate(entry.date)}</span>
                        <Badge variant="outline" className="text-xs">{getMoodEmoji(entry.mood)}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Mobile Triggers Tab */}
        {activeTab === "triggers" && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Describe a trigger"
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                  aria-label="New trigger description"
                />
                
                <div className="flex items-center gap-2">
                  <select
                    value={triggerIntensity}
                    onChange={(e) => setTriggerIntensity(parseInt(e.target.value, 10))}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    aria-label="Trigger intensity level"
                  >
                    <option value="1">Very Low</option>
                    <option value="3">Low</option>
                    <option value="5">Medium</option>
                    <option value="7">High</option>
                    <option value="9">Very High</option>
                  </select>
                  
                  <Button onClick={addTrigger} aria-label="Add new trigger">
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3 pt-3 border-t">
                <h3 className="font-medium text-sm">Your Triggers</h3>
                
                {triggers.length === 0 && (
                  <p className="text-gray-500 text-xs italic">No triggers identified yet.</p>
                )}
                
                {triggers.map((trigger) => (
                  <Card key={trigger.id} className="bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{trigger.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            trigger.intensity >= 7 ? 'bg-red-50 text-red-700' :
                            trigger.intensity >= 4 ? 'bg-yellow-50 text-yellow-700' :
                            'bg-green-50 text-green-700'
                          }`}
                        >
                          Level: {trigger.intensity}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Mobile Coping Tools Tab */}
        {activeTab === "coping" && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <p className="text-sm text-gray-600">
                Select a technique to use when facing urges or difficult situations:
              </p>
              
              <div className="space-y-3">
                {copingStrategies.map((strategy) => (
                  <Card 
                    key={strategy.id}
                    className={`cursor-pointer transition-all ${
                      selectedCopingStrategy === strategy.id ? 'bg-purple-50 border-purple-200' : 'bg-gray-50'
                    }`}
                    onClick={() => setSelectedCopingStrategy(
                      selectedCopingStrategy === strategy.id ? null : strategy.id
                    )}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCopingStrategy(
                          selectedCopingStrategy === strategy.id ? null : strategy.id
                        );
                      }
                    }}
                    role="button"
                    aria-expanded={selectedCopingStrategy === strategy.id}
                    aria-controls={`mobile-strategy-content-${strategy.id}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {strategy.icon}
                          <h3 className="font-medium text-sm">{strategy.title}</h3>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          selectedCopingStrategy === strategy.id ? 'rotate-180' : ''
                        }`} aria-hidden="true" />
                      </div>
                      
                      <AnimatePresence>
                        {selectedCopingStrategy === strategy.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 overflow-hidden"
                            id={`mobile-strategy-content-${strategy.id}`}
                          >
                            <p className="text-xs text-gray-600 mb-2">{strategy.description}</p>
                            <ol className="list-decimal list-inside space-y-1 text-xs pl-1">
                              {strategy.steps.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                            <div className="mt-3 flex justify-end">
                              <Button 
                                size="sm"
                                variant="outline"
                                className="text-xs py-1 h-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const message = `I used the ${strategy.title} technique today and it helped me stay on track.`;
                                  setNewJournalEntry(message);
                                  setActiveTab('journal');
                                }}
                                aria-label={`Log success using ${strategy.title} technique`}
                              >
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                Log Success
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Mobile Community Tab */}
        {activeTab === "community" && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <p className="text-sm text-gray-600">
                Connect with others on your journey:
              </p>
              
              <div className="space-y-3">
                {communityResources.map((resource) => (
                  <Card key={resource.name} className="bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        {resource.icon}
                        <h3 className="font-medium text-sm">{resource.name}</h3>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                        aria-label={`Visit ${resource.name} website`}
                      >
                        Visit Resource
                        <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 mt-4">
                <h3 className="font-medium text-blue-700 text-sm mb-2">Find Local Support</h3>
                <p className="text-xs text-gray-600 mb-3">
                  In-person meetings can provide valuable face-to-face support:
                </p>
                <div className="space-y-2">
                  <a 
                    href="https://www.aa.org/find-aa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Find AA Meetings Near You
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SobrietySupport;
