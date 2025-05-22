import React from 'react';
import { usePaperContext } from '../context/PaperContext';
import { BookmarkIcon } from 'lucide-react';
import { Paper } from '../types';
import { Link } from 'react-router-dom';

const Bookmarks: React.FC = () => {
  const { papers, uploadPaper } = usePaperContext();
  
  // Filter only bookmarked papers
  const bookmarkedPapers = papers.filter(paper => paper.bookmarked);

  const handlePaperClick = (paper: Paper) => {
    uploadPaper(paper);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <BookmarkIcon size={24} className="text-orange-500 mr-3" />
          <h1 className="text-3xl font-bold">Bookmarked Papers</h1>
        </div>

        {bookmarkedPapers.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <BookmarkIcon size={32} className="text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold">No Bookmarks Yet</h2>
              <p className="text-gray-400 max-w-md">
                You haven't bookmarked any papers yet. Upload a paper and click the bookmark icon to save it for later.
              </p>
              <Link
                to="/dashboard"
                className="mt-2 inline-flex items-center px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors"
              >
                Upload a Paper
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedPapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => handlePaperClick(paper)}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{paper.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {paper.authors.slice(0, 2).map((author, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {author}
                      </span>
                    ))}
                    {paper.authors.length > 2 && (
                      <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        +{paper.authors.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatDate(paper.uploadDate)}
                    </span>
                    <BookmarkIcon size={18} className="text-orange-500 fill-orange-500" />
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

export default Bookmarks;