import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { usePaperContext } from '../../context/PaperContext';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { currentPaper, chatMessages, sendChatMessage, isLoading } = usePaperContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[80vh] bg-gray-900 rounded-xl border border-gray-800 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black">
          <div>
            <h3 className="font-semibold text-white">
              Chat About Paper
            </h3>
            {currentPaper && (
              <p className="text-sm text-gray-400 truncate max-w-[250px] md:max-w-md">
                {currentPaper.title}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p className="text-center mb-2">No messages yet</p>
              <p className="text-sm text-center">Ask a question about this paper to start a conversation</p>
            </div>
          ) : (
            <>
              {chatMessages.map((message,index) => (
                <ChatMessage key={message.id|| index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <ChatInput onSendMessage={sendChatMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;