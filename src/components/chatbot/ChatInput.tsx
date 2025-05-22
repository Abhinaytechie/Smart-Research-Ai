import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-end bg-gray-900 rounded-xl border border-gray-700 focus-within:border-orange-500 transition-all duration-200 p-3">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about this paper..."
        className="w-full bg-transparent text-white resize-none outline-none max-h-32 placeholder:text-gray-500"
        rows={1}
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        className={`ml-2 p-2 rounded-full flex-shrink-0 transition-all duration-200 ${
          message.trim() && !isLoading
            ? 'bg-orange-500 text-black hover:bg-orange-600'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;