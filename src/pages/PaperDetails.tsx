// PaperDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper } from '../types';
import { fetchPaperById } from '../utils/api';
import ReactMarkdown from 'react-markdown';
const PaperDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const navigate = useNavigate();

 useEffect(() => {
    if (!id) return;
    fetchPaperById(id)
      .then(data => setPaper(data))
      .catch(() => navigate('/bookmarks'));
  }, [id, navigate]);
  if (!paper) return <div>Loading...</div>;

  return (
    <div className="p-12 md:p-16 max-w-5xl mx-auto my-12 bg-gray-900 rounded-lg shadow-lg text-white">

  <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>
  <p className="mb-4"><strong>Authors:</strong> {paper.authors.join(', ')}</p>
  <p className="mb-4"><strong>Upload Date:</strong> {new Date(paper.uploadDate).toLocaleDateString()}</p>
  <p className="mb-8"><strong>Abstract:</strong> {paper.abstractText}</p>

  <p className="mb-2 font-bold">Content:</p>
  <div className="prose prose-invert max-w-4xl mx-full px-2 py-8 bg-gray-900 rounded-lg shadow-lg  leading-relaxed">
  {paper.content
  .split(/\n{2,}/)              // Split on two or more newlines to separate paragraphs
  .map(paragraph => paragraph.trim())  // Trim each paragraph
  .filter(paragraph => paragraph.length > 0)  // Remove empty paragraphs
  .map((paragraph, idx) => (
    <p 
      key={idx} 
      className="mb-6 text-justify leading-relaxed max-w-full tracking-wide"
      style={{ whiteSpace: 'pre-line' }} // preserves single line breaks within paragraphs
    >
      {paragraph}
    </p>
  ))
}

</div>


  <button
    onClick={() => navigate('/bookmarks')}
    className="bg-orange-500 px-4 py-2 rounded mt-6"
  >
    Back to Bookmarks
  </button>
</div>

  );
};

export default PaperDetails;
