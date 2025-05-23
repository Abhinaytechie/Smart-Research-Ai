export interface Paper {
  id: string;
  title: string;
  abstractText: string;
  content: string;
  authors: string[];    // make sure this is an array!
  uploadDate: string;   // ISO string date
  bookmarked?: boolean;
}


export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface User {
  username: string;
  token: string;
  email?: string;
  roles?: string[];
  bookmarks: Paper[];    // Assuming Paper is your paper type

}



export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface PaperContextType {
  currentPaper?: Paper | null;
  papers: Paper[];
  chatMessages: ChatMessage[];
  isLoading: boolean;
  isProcessing: boolean;
  processingType: string | null;
  result: {
    type: string | null;
    content: string | null;
  };
  uploadPaper: (file: File) => Promise<void>;
  bookmarkPaper: (id: string) => void;
  clearCurrentPaper: () => void;
  sendChatMessage: (message: string) => Promise<void>;
  processAction: (action: string) => Promise<void>;
  clearResult: () => void;
}