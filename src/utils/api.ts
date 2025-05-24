// utils/api.ts
import axios from 'axios';
import { Paper, ChatMessage, User } from '../types';
const paperApi = axios.create({
  baseURL: 'https://smart-research-ai.onrender.com/api/paper',
});

const userApi = axios.create({
  baseURL: 'https://smart-research-ai.onrender.com/user',
});

/* ------------------- Paper APIs ------------------- */
export const fetchPaperById = async (id: string): Promise<Paper> => {
  const response = await paperApi.get(`/${id}`);
  return response.data;
};
// Upload a paper
export const uploadPaperAPI = async (formData: FormData): Promise<Paper> => {
  const response = await paperApi.post(`/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};


// Toggle bookmark
export const toggleBookmarkAPI = async (id: string): Promise<Paper> => {
  const response = await paperApi.put(`/${id}/bookmark`);
  return response.data;
};

// Process paper action (summarize, explain, code generation)
export const processPaper = async (content: string, action: string): Promise<string> => {
  const endpointMap: Record<string, string> = {
    summarize: 'summarize',
    code: 'generate-code',
    explain: 'explain',
  };

  const response = await paperApi.post(
    `/${endpointMap[action]}`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};



export const sendMessage = async (paperId: string, message: string) => {
  const response = await paperApi.post(`/${paperId}/chat`, 
    { message }, // Request body
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data; // Assumes backend returns a ChatMessage object
};




/* ------------------- User Authentication ------------------- */

export const login = async (username: string, password: string): Promise<User> => {
  const response = await userApi.post('/login', {
    username,
    password,
  }, { withCredentials: true });

  const { token, username: returnedUsername } = response.data;

  return {
    username: returnedUsername,
    token,
    bookmarks: []
  };
};


export const signup = async (username: string, password: string): Promise<User> => {
  const response = await userApi.post('/signup', {
    username,
    password,
  });
  return response.data;
};

export const fetchUserDetails = async (token: string) => {
  const response = await userApi.get('/details', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // { bookmarks: [...], history: [...] }
};
// Bookmark a paper
// Bookmark a paper
paperApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const bookmarkPaperApi = async (id: string) => {
  await paperApi.post('/bookmark', { paperId: id });
  
};



// Unbookmark a paper
export const unbookmarkPaperApi = async (id: string) => {
  await paperApi.post('/unbookmark', { paperId:id });
};

