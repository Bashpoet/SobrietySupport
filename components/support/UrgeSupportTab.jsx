import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Settings as SettingsIcon, RefreshCcw } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import { useAPI } from '../../context/APIContext';

/**
 * UrgeSupportTab component
 * 
 * Real-time AI-powered urge support chat
 */
const UrgeSupportTab = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  
  // Get user data from context
  const { 
    calculateSobrietyDays, 
    setPositiveChoices 
  } = useUserData();
  
  // Get API data from context
  const { 
    isApiConfigured, 
    personalizationEnabled,
    isProcessingUrgeMessage,
    handleUrgeSupportMessage
  } = useAPI();
  
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!newMessage.trim() || isProcessingUrgeMessage) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    
    // Prepare context for AI response
    const userContext = {
      sobrietyDays: calculateSobrietyDays(),
      timeOfDay: getTimeOfDay()
    };
    
    // Get AI response
    const result = await handleUrgeSupportMessage(
      userMessage.content,
      messages,
      userContext
    );
    
    if (result?.response) {
      // Add assistant message to chat
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      
      // Record positive choice for using urge support
      setPositiveChoices(prev => prev + 1);
    }
  };
  
  // Helper to get time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };
  
  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <span>Real-Time Urge Support</span>
          </h2>
          
          {messages.length > 0 && (
            <button
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={handleClearChat}
              aria-label="Clear chat history"
            >
              <RefreshCcw className="w-4 h-4 mr-1" />
              New Chat
            </button>
          )}
        </div>
        
        {!isApiConfigured ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">AI Support Available</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Enable personalized AI support by adding your Anthropic API key in settings.
              This will unlock real-time guidance during challenging moments.
            </p>
            <button 
              onClick={() => {
                // This would open settings in the parent component
                // For now, we'll just alert the user
                alert('Please open settings to configure your API key');
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <SettingsIcon className="w-4 h-4 mr-2 inline-block" />
              Configure API
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-[500px]">
            {/* Chat messages area */}
            <div 
              className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-200 rounded-md"
              aria-live="polite"
              aria-atomic="false"
              aria-relevant="additions"
            >
              {messages.length === 0 ? (
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
                  {messages.map(msg => (
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
            
            {/* Message input form */}
            <form 
              onSubmit={handleSendMessage} 
              className="flex gap-2 border-t border-gray-200 pt-4"
            >
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Describe what you're feeling right now..."
                className="flex-1 min-h-12 max-h-24 p-3 border border-gray-300 rounded-md resize-y focus:ring-purple-500 focus:border-purple-500"
                disabled={isProcessingUrgeMessage || !isApiConfigured}
                aria-label="Your message"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button 
                type="submit" 
                className="h-12 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim() || isProcessingUrgeMessage || !isApiConfigured}
                aria-label="Send message"
              >
                {isProcessingUrgeMessage ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-purple-200 border-r-0 border-b-0 border-l-0" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrgeSupportTab;
