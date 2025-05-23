import React, { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const isUser = message.sender === 'user';

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <div 
      ref={messageRef}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-orange-500 text-black text-bold rounded-tr-sm' 
            : 'bg-gray-800 text-white rounded-tl-sm'
        }`}

      >
        

        
       <div className="prose max-w-none p-1  text-white-900 rounded-md whitespace-pre-wrap">
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </div>

        <div 
          className={`text-xs mt-1 ${isUser ? 'text-black/90' : 'text-gray-400'}`}
        >
         {message.timestamp && !isNaN(new Date(message.timestamp).getTime())
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Invalid time'}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;