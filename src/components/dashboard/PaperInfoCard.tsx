import React from 'react';
import { Paper } from '../../types';
import { BookmarkIcon, Bookmark } from 'lucide-react';
import { usePaperContext } from '../../context/PaperContext';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

interface PaperInfoCardProps {
  paper: Paper;
}

const PaperInfoCard: React.FC<PaperInfoCardProps> = ({ paper }) => {
  const { setCurrentPaper } = usePaperContext();
  const { addBookmark, removeBookmark, user } = useAuth();

  // Format the date
  const formattedDate = formatDate(paper.uploadDate);

  // Determine if the current paper is already bookmarked
  const isBookmarked = user?.bookmarks?.some(b => b.id === paper.id);

  // Toggle bookmark status
  const toggleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark(paper.id);
    } else {
      await addBookmark(paper.id);
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden transition-all duration-300 hover:border-orange-500/30">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{paper.title}</h2>
            <div className="flex flex-wrap gap-1 mb-3">
              {paper.authors.map((author, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {author}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Uploaded on {formattedDate}</p>
          </div>

          <button
            onClick={toggleBookmark}
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <Bookmark size={24} className="fill-orange-500 text-orange-500" />
            ) : (
              <BookmarkIcon size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperInfoCard;
