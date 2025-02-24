import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// Create the context
const APIContext = createContext(null);

/**
 * Provider component for API interactions
 * 
 * Manages API configuration, requests, and related state
 */
export const APIProvider = ({ children }) => {
  // API configuration
  const [apiKey, setApiKey] = useState('');
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  
  // API request state
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [isProcessingUrgeMessage, setIsProcessingUrgeMessage] = useState(false);
  
  // API cooldown management
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const cooldownTimerRef = useRef(null);
  const COOLDOWN_PERIOD = 10000; // 10 seconds in milliseconds
  
  // AI-generated content
  const [personalizedMessages, setPersonalizedMessages] = useState([]);
  const [currentJournalPrompt, setCurrentJournalPrompt] = useState('');
  const [usedJournalPrompts, setUsedJournalPrompts] = useState([]);
  
  // Load API key on init
  useEffect(() => {
    const storedApiKey = sessionStorage.getItem('claudeApiKey') || localStorage.getItem('claudeApiKey');
    if (storedApiKey) {
      // If found in localStorage, migrate to sessionStorage and remove from localStorage
      if (localStorage.getItem('claudeApiKey')) {
        sessionStorage.setItem('claudeApiKey', storedApiKey);
        localStorage.removeItem('claudeApiKey');
      }
      setApiKey(storedApiKey);
      setIsApiConfigured(true);
      
      // Load stored AI data
      const storedMessages = localStorage.getItem('personalizedMessages');
      const storedPrompts = localStorage.getItem('usedJournalPrompts');
      
      try {
        if (storedMessages) {
          setPersonalizedMessages(JSON.parse(storedMessages));
        }
        if (storedPrompts) {
          setUsedJournalPrompts(JSON.parse(storedPrompts));
        }
      } catch (e) {
        console.error("Error loading stored AI data:", e);
      }
    }
  }, []);
  
  // Manage cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      cooldownTimerRef.current = setTimeout(() => {
        setCooldownRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      
      return () => {
        if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      };
    }
  }, [cooldownRemaining]);
  
  // Save API key and enable features
  const saveApiKey = (apiKey) => {
    if (apiKey) {
      // Use sessionStorage instead of localStorage for API key
      sessionStorage.setItem('claudeApiKey', apiKey);
      setApiKey(apiKey);
      setIsApiConfigured(true);
      return true;
    }
    return false;
  };
  
  // Clear API key
  const clearApiKey = () => {
    setApiKey('');
    setIsApiConfigured(false);
    sessionStorage.removeItem('claudeApiKey');
    localStorage.removeItem('claudeApiKey'); // Clean up any previous localStorage key
  };
  
  // Base function to call Claude API
  const callClaudeAPI = useCallback(async (prompt, systemPrompt) => {
    if (!apiKey) {
      console.error("API key not configured");
      return null;
    }
    
    try {
      // In a production environment, this would call a backend proxy
      // For now, we call the API directly for development purposes
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
  }, [apiKey]);
  
  // Generate personalized message
  const generatePersonalizedMessage = useCallback(async (userContext) => {
    if (!isApiConfigured || !personalizationEnabled) return null;
    
    // Check cooldown period
    const now = Date.now();
    if (now - lastMessageTimestamp < COOLDOWN_PERIOD) {
      // Calculate remaining seconds for cooldown
      const remainingSeconds = Math.ceil((COOLDOWN_PERIOD - (now - lastMessageTimestamp)) / 1000);
      setCooldownRemaining(remainingSeconds);
      return { error: `Please wait ${remainingSeconds} seconds before generating another message.` };
    }
    
    setIsGeneratingMessage(true);
    setLastMessageTimestamp(now);
    setCooldownRemaining(COOLDOWN_PERIOD / 1000);
    
    const systemPrompt = `You are a compassionate AI assistant for a sobriety support app. Your role is to provide 
    encouraging, motivational messages that are personalized to the user's recovery journey.
    Keep messages concise (1-2 sentences), warm, and specific to their situation. 
    Don't mention alcohol or substances directly. Focus on strength, growth, and resilience.`;
    
    const prompt = `Please generate a personalized motivational message based on the following user information:
    
    User Name: ${userContext.name || "friend"}
    Days Sober: ${userContext.sobrietyDays}
    Time of Day: ${userContext.timeOfDay}
    Current Mood: ${userContext.mood}
    
    Recent Journal Entries: ${
      userContext.journalEntries?.length > 0 
        ? userContext.journalEntries.map(entry => `- ${entry.content.substring(0, 100)}... (Mood: ${entry.mood})`).join('\n')
        : "No recent entries"
    }
    
    Identified Triggers: ${
      userContext.triggers?.length > 0
        ? userContext.triggers.map(trigger => trigger.name).join(', ')
        : "None identified yet"
    }
    
    Provide a single, encouraging message that feels personal and acknowledges their specific journey. Max 2 sentences.`;
    
    try {
      const message = await callClaudeAPI(prompt, systemPrompt);
      
      if (message) {
        // Add message to history and update display using functional update
        const newMessage = { 
          text: message, 
          timestamp: new Date().toISOString() 
        };
        
        setPersonalizedMessages(prevMessages => {
          const updatedMessages = [...prevMessages, newMessage];
          // Store in localStorage
          localStorage.setItem('personalizedMessages', JSON.stringify(updatedMessages));
          return updatedMessages;
        });
        
        setIsGeneratingMessage(false);
        return { message: message };
      }
    } catch (error) {
      console.error("Failed to generate personalized message:", error);
    } finally {
      setIsGeneratingMessage(false);
    }
    
    return { error: "Failed to generate message" };
  }, [
    isApiConfigured, 
    personalizationEnabled, 
    lastMessageTimestamp, 
    callClaudeAPI, 
    COOLDOWN_PERIOD
  ]);
  
  // Generate journal prompt
  const generateJournalPrompt = useCallback(async (userContext) => {
    if (!isApiConfigured || !personalizationEnabled) return null;
    
    setIsGeneratingPrompt(true);
    
    const systemPrompt = `You are an insightful AI assistant for a sobriety support app. Your role is to provide thought-provoking journal prompts 
    that help users reflect on their recovery journey in a meaningful way. Create prompts that encourage users to explore their emotions, 
    identify patterns, celebrate progress, and develop self-awareness.`;
    
    const prompt = `Generate a thoughtful journaling prompt for someone in recovery.
    
    Days Sober: ${userContext.sobrietyDays}
    Recent Journal Entries: ${userContext.recentEntries?.length > 0 ? userContext.recentEntries.join(' | ') : "No recent entries"}
    Dominant Mood Recently: ${userContext.dominantMood || "neutral"}
    Identified Triggers: ${userContext.triggers?.map(t => t.name).join(', ') || "None identified"}
    
    Make the prompt specific, reflective, and encouraging. Avoid directly mentioning substances.
    The prompt should help the user gain new insights about their journey.
    Keep it to 1-2 sentences maximum.

    Previously used prompts (avoid duplicating):
    ${usedJournalPrompts.join(' | ')}`;
    
    try {
      const promptText = await callClaudeAPI(prompt, systemPrompt);
      
      if (promptText) {
        setCurrentJournalPrompt(promptText);
        // Use functional update to ensure we're working with the latest state
        setUsedJournalPrompts(prevPrompts => {
          const newPrompts = [...prevPrompts, promptText];
          localStorage.setItem('usedJournalPrompts', JSON.stringify(newPrompts));
          return newPrompts;
        });
        
        setIsGeneratingPrompt(false);
        return { prompt: promptText };
      }
    } catch (error) {
      console.error("Failed to generate journal prompt:", error);
    } finally {
      setIsGeneratingPrompt(false);
    }
    
    return { error: "Failed to generate prompt" };
  }, [
    isApiConfigured, 
    personalizationEnabled, 
    callClaudeAPI, 
    usedJournalPrompts
  ]);
  
  // Handle urge support message
  const handleUrgeSupportMessage = useCallback(async (userMessage, chatHistory, userContext) => {
    if (!isApiConfigured || !personalizationEnabled || !userMessage.trim()) {
      return null;
    }
    
    setIsProcessingUrgeMessage(true);
    
    const formattedChatHistory = chatHistory
      ?.slice(-6) // Get last 6 messages
      ?.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      ?.join('\n') || "This is the start of the conversation.";
    
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
    - Days sober: ${userContext.sobrietyDays}
    - Time of day: ${userContext.timeOfDay}
    
    Recent conversation:
    ${formattedChatHistory}
    
    User's current message: ${userMessage}
    
    Provide a supportive, practical response focused on helping them through this moment. Keep it conversational and brief.`;
    
    try {
      const response = await callClaudeAPI(prompt, systemPrompt);
      
      if (response) {
        setIsProcessingUrgeMessage(false);
        return { response };
      }
    } catch (error) {
      console.error("Failed to get urge support response:", error);
    } finally {
      setIsProcessingUrgeMessage(false);
    }
    
    // Fallback response if API call fails
    return { 
      response: "I'm here with you. This urge is temporary and will pass. Take a few deep breaths and remember why your recovery matters to you."
    };
  }, [isApiConfigured, personalizationEnabled, callClaudeAPI]);
  
  // Create context value object
  const contextValue = {
    // API configuration
    apiKey,
    isApiConfigured,
    personalizationEnabled,
    setPersonalizationEnabled,
    saveApiKey,
    clearApiKey,
    
    // API state
    isGeneratingMessage,
    isGeneratingPrompt,
    isProcessingUrgeMessage,
    cooldownRemaining,
    
    // AI content
    personalizedMessages,
    currentJournalPrompt,
    usedJournalPrompts,
    
    // API functions
    callClaudeAPI,
    generatePersonalizedMessage,
    generateJournalPrompt,
    handleUrgeSupportMessage
  };
  
  return (
    <APIContext.Provider value={contextValue}>
      {children}
    </APIContext.Provider>
  );
};

// Custom hook for using the API context
export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};
