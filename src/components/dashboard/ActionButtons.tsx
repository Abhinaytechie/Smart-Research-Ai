import React from 'react';
import { FileText, Code, HelpCircle, MessageCircle } from 'lucide-react';
import Button from '../common/Button';
import axios from 'axios';
import { usePaperContext } from '../../context/PaperContext';


interface ActionButtonsProps {
  onChatOpen: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onChatOpen }) => {
  const { processAction, isProcessing, processingType } = usePaperContext();
  
  const { currentPaper } = usePaperContext(); // or wherever your paper data is

const handleAction = async (action: string) => {
  if (action === 'chat') {
    onChatOpen();
    return;
  }

  const endpoints: Record<string, string> = {
    summarize: '/api/paper/summarize',
    code: '/api/paper/generate-code',
    explain: '/api/paper/explain',
  };

  const endpoint = endpoints[action];
  if (!endpoint) return;

  try {
    processAction(action);

    const response = await axios.post(
  `http://localhost:8080${endpoint}`, 
  {
    content: currentPaper?.content || "Default fallback content"
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);


    console.log(`${action} response:`, response.data);

    // Optionally update context or state to display result
  } catch (error) {
    console.error(`${action} error:`, error);
  }
};


  const actions = [
    {
      id: 'summarize',
      label: 'Summarize',
      icon: <FileText size={20} />,
      description: 'Get a concise summary of the paper'
    },
    {
      id: 'code',
      label: 'Generate Code',
      icon: <Code size={20} />,
      description: 'Generate code based on the paper'
    },
    {
      id: 'explain',
      label: 'Explain',
      icon: <HelpCircle size={20} />,
      description: 'Get a detailed explanation'
    },
    {
      id: 'chat',
      label: 'Chat About Paper',
      icon: <MessageCircle size={20} />,
      description: 'Have a conversation about the paper'
    }
  ];

  return (
    
           
         
           
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {actions.map((action) => (
          <div 
            key={action.id}
            className="group"
          >
            <Button
              type="vibrant"
              fullWidth
              icon={action.icon}
              onClick={() => handleAction(action.id)}
              isLoading={isProcessing && processingType === action.id}
              className="flex-col py-4 h-full group-hover:border-orange-500"
            >
              <span className="mt-2">{action.label}</span>
            </Button>
            <div className="mt-1 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {action.description}
            </div>
          </div>
        ))}
      </div>
    </div>
    
           
  );
};

export default ActionButtons;