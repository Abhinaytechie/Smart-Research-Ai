import React from 'react';
import { usePaperContext } from '../context/PaperContext';
import { History as HistoryIcon, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Paper } from '../types';

const History: React.FC = () => {
  const { papers, uploadPaper } = usePaperContext();
  
  // Sort papers by upload date (newest first)
  const sortedPapers = [...papers].sort((a, b) => 
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );

  const handlePaperClick = (paper: Paper) => {
    uploadPaper(paper);
  };

  // Format date with relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <HistoryIcon size={24} className="text-orange-500 mr-3" />
          <h1 className="text-3xl font-bold">Research History</h1>
        </div>

        {sortedPapers.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <HistoryIcon size={32} className="text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold">No History Yet</h2>
              <p className="text-gray-400 max-w-md">
                You haven't uploaded any papers yet. Start by uploading a research paper.
              </p>
              <Link
                to="/"
                className="mt-2 inline-flex items-center px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors"
              >
                Upload a Paper
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => handlePaperClick(paper)}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
              >
                <div className="p-5 flex items-center">
                  <div className="mr-4 p-3 bg-gray-800 rounded-full">
                    <Clock size={24} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 truncate">{paper.title}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="truncate">
                        {paper.authors.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center">
                    <span className="text-sm text-gray-500">
                      {formatRelativeTime(paper.uploadDate)}
                    </span>
                    {paper.bookmarked && (
                      <div className="ml-3 w-2 h-2 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;