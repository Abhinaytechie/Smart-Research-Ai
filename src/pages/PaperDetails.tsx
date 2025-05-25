import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper } from '../types';
import { fetchPaperById } from '../utils/api';
import { motion } from 'framer-motion';

const PaperDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetchPaperById(id)
      .then((data) => setPaper(data))
      .catch(() => navigate('/bookmarks'));
  }, [id, navigate]);

  if (!paper) return <div className="text-white p-8">Loading...</div>;

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-12 md:p-16 max-w-5xl mx-auto my-12 bg-gray-900 rounded-lg shadow-lg text-white"
    >
      <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>
      <p className="mb-4">
        <strong>Authors:</strong> {paper.authors.join(', ')}
      </p>
      <p className="mb-4">
        <strong>Upload Date:</strong>{' '}
        {new Date(paper.uploadDate).toLocaleDateString()}
      </p>
      <p className="mb-8">
        <strong>Abstract:</strong> {paper.abstractText}
      </p>

      <p className="mb-2 font-bold">Content:</p>
      <div className="prose prose-invert max-w-4xl mx-full px-2 py-8 bg-gray-900 rounded-lg shadow-lg leading-relaxed">
        {paper.content
          .split(/\n{2,}/)
          .map((paragraph) => paragraph.trim())
          .filter((paragraph) => paragraph.length > 0)
          .map((paragraph, idx) => (
            <motion.p
              key={idx}
              custom={idx}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 text-justify leading-relaxed max-w-full tracking-wide"
              style={{ whiteSpace: 'pre-line' }}
            >
              {paragraph}
            </motion.p>
          ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/bookmarks')}
        className="bg-orange-500 px-4 py-2 rounded mt-6 text-black hover:bg-orange-600 transition-colors"
      >
        Back to Bookmarks
      </motion.button>
    </motion.div>
  );
};

export default PaperDetails;
