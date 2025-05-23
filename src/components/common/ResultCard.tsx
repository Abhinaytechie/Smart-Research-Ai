import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import Button from './Button';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
  title: string;
  content: string;
  onClose: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content, onClose }) => {
  const [expanded, setExpanded] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`w-full bg-gray-900 rounded-xl border border-gray-700 shadow-xl mb-6 transition-all duration-500 overflow-hidden ${
        animateIn 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-10'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
          <h3 className="font-medium text-white text-lg">{title}</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={toggleExpanded}
            className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div 
        className={`transition-all duration-300 overflow-hidden ${
          expanded ? 'max-h-[500px] overflow-y-auto' : 'max-h-0'
        }`}
      >
       <div className="prose max-w-none p-4  text-grey-300 rounded-md whitespace-pre-wrap">
             <ReactMarkdown>{content}</ReactMarkdown>
           </div>
      </div>
    </div>
  );
};

export default ResultCard;