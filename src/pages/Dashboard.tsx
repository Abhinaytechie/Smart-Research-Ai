import React, { useState, useRef } from 'react';
import { usePaperContext } from '../context/PaperContext';
import { Upload } from 'lucide-react';
import Button from '../components/common/Button';
import PaperInfoCard from '../components/dashboard/PaperInfoCard';
import ActionButtons from '../components/dashboard/ActionButtons';
import ResultCard from '../components/common/ResultCard';
import Chatbot from '../components/chatbot/Chatbot';



const Dashboard: React.FC = () => {
  const { currentPaper, uploadPaper, result, clearResult,} = usePaperContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
  if (!file) return;

  setIsUploading(true);
  try {
    await uploadPaper(file); // Just call context method
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Failed to upload file');
  } finally {
    setIsUploading(false);
  }
};


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0c0c] to-blue-900/80 text-white pt-20 pb-24 font-sans">
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-orange-400 drop-shadow-md tracking-wide animate-fadeInUp">
        🚀 Your Smart Research Assistant
      </h1>

      {!currentPaper ? (
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 shadow-inner ${
            isDragging
              ? 'border-orange-500 bg-orange-500/10'
              : 'border-gray-700 hover:border-gray-500 hover:shadow-orange-500/10'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Upload size={36} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-semibold tracking-wide">
              Upload Your Research Paper
            </h2>
            <p className="text-gray-400 max-w-md text-base">
              Drag & drop a PDF here or select a file to get instant summaries, code, and AI insights.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".pdf"
              className="hidden"
            />
            <Button
              onClick={handleUploadClick}
              isLoading={isUploading}
              icon={<Upload size={18} />}
              type="vibrant"
            >
              Select PDF File
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-10 animate-fadeIn">
          <PaperInfoCard paper={currentPaper} />

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">
              📌 Available Actions
            </h2>
            <ActionButtons onChatOpen={() => setIsChatOpen(true)} />
          </div>

          {result.content && (
            <div className="mt-8">
              
              <ResultCard
                title={`✨ ${result.type?.charAt(0).toUpperCase()}${result.type?.slice(1)} Result`}
                content={result.content}
                onClose={clearResult}
              />
            </div>
          )}
        </div>
      )}
    </div>

    <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
  </div>
);

};

export default Dashboard;
