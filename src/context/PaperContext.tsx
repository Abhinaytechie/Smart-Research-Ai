import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Paper, ChatMessage, PaperContextType } from '../types';
import { processPaper, sendMessage ,uploadPaperAPI, bookmarkPaperApi,unbookmarkPaperApi} from '../utils/api';


// Create context with default values
const PaperContext = createContext<PaperContextType>({} as PaperContextType);

// Custom hook to use the paper context
export const usePaperContext = () => useContext(PaperContext);

interface PaperProviderProps {
  children: ReactNode;
}

export const PaperProvider = ({ children }: PaperProviderProps) => {
  const [currentPaper, setCurrentPaper] = useState<Paper | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingType, setProcessingType] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: string | null; content: string | null }>({
    type: null,
    content: null,
  });

  // Upload a paper and set it as current
 // Clear result


// Upload a paper and set it as current
const uploadPaper = useCallback(async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const savedPaper = await uploadPaperAPI(formData as any);
    setCurrentPaper(savedPaper);
    setPapers((prev) => [savedPaper, ...prev.filter(p => p.id !== savedPaper.id)]);
    setChatMessages([]);
    clearResult();
  } catch (err) {
    console.error("Upload failed:", err);
  }
}, []);


    

  // Bookmark or unbookmark a paper
  const bookmarkPaper = useCallback(async (id: string) => {
  if (!currentPaper) return;

  const paper = papers.find(p => p.id === id);
  if (!paper) return;

  const isBookmarked = paper.bookmarked;

  try {
    if (!isBookmarked) {
      await bookmarkPaperApi(id);
    } else {
      await unbookmarkPaperApi(id);
    }

    // Update state only after success
    setPapers(prevPapers =>
      prevPapers.map(p =>
        p.id === id ? { ...p, bookmarked: !isBookmarked } : p
      )
    );

    if (currentPaper.id === id) {
      setCurrentPaper(prev => prev ? { ...prev, bookmarked: !isBookmarked } : null);
    }
  } catch (err) {
    console.error("Failed to update bookmark:", err);
  }
}, [currentPaper, papers]);


  // Clear current paper
  const clearCurrentPaper = useCallback(() => {
    setCurrentPaper(null);
    setChatMessages([]);
    clearResult();
  }, []);

  // Send a chat message and get response
  const sendChatMessage = useCallback(async (message: string) => {
    if (!currentPaper) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    
    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      console.log("Paper ID passed to sendMessage: ",currentPaper.id);

      // Make API call to get bot response
      const botResponse = await sendMessage(currentPaper.id, message);
      const botMessage: ChatMessage = {
      ...botResponse,
      timestamp: new Date().toISOString(),
    };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPaper]);

  // Process an action on the current paper
  const processAction = useCallback(async (action: string) => {
    if (!currentPaper) return;
    
    setIsProcessing(true);
    setProcessingType(action);
    clearResult();
    
    try {
      const response = await processPaper(currentPaper.content, action);
      setResult({
        type: action,
        content: response,
      });
    } catch (error) {
      setResult({
        type: action,
        content: 'An error occurred while processing your request.',
      });
    } finally {
      setIsProcessing(false);
      setProcessingType(null);
    }
  }, [currentPaper]);
const clearResult = useCallback(() => {
  setResult({
    type: null,
    content: null,
  });
}, []);
  

  const contextValue: PaperContextType = {
    currentPaper,
    papers,
    chatMessages,
    isLoading,
    isProcessing,
    processingType,
    result,
    setCurrentPaper,
    uploadPaper,
    bookmarkPaper,
    clearCurrentPaper,
    sendChatMessage,
    processAction,
    clearResult,
  };

  return (
    <PaperContext.Provider value={contextValue}>
      {children}
    </PaperContext.Provider>
  );
};