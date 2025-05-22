// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Sparkles, Upload, UserPlus } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0c0c] via-65% to-blue-700/80 to-90% text-white flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-10 animate-fadeIn">
          <div className="inline-flex items-center px-3 py-1 bg-orange-600/20 border border-orange-500/30 text-sm rounded-full mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
            Now with AI-Powered Code Extraction
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Meet Your <span className="text-orange-500">Smart Research Assistant</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Upload academic papers and let AI handle the summarization, code generation, and even intelligent Q&A—all in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button type="primary" icon={<Upload size={16} />}>Get Started</Button>
            </Link>
            <Link to="/auth">
              <Button type="ghost" icon={<UserPlus size={16} />}>Create Account</Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fadeInUp">
          {[
            {
              title: 'Summarize Instantly',
              desc: 'Understand large papers in seconds with accurate, AI-generated summaries.',
              icon: '📄',
            },
            {
              title: 'Extract Code & Data',
              desc: 'Automatically pull out code snippets or datasets mentioned in your papers.',
              icon: '💻',
            },
            {
              title: 'Chat with Your Paper',
              desc: 'Interact with your documents as if they were intelligent assistants.',
              icon: '🧠',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-blue-960/60 border border-yellow-900 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/80 transition"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-800">
        &copy; {new Date().getFullYear()} <span className="text-orange-500">ResearchAI</span>. Built with ❤️ for curious minds.
      </footer>
    </div>
  );
};

export default HomePage;
