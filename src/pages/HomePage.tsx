// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Sparkles, Upload, UserPlus } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0c0c] via-65% to-blue-700/80 to-90% text-white flex flex-col relative">
      {/* Mobile Navigation Anchors */}
      <div className="md:hidden flex gap-4 justify-center text-sm mt-4 px-4">
        <a href="#features" className="text-orange-400 underline">Features</a>
        <a href="#how-it-works" className="text-orange-400 underline">How It Works</a>
        <a href="#audience" className="text-orange-400 underline">Audience</a>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center text-center">
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
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fadeInUp">
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

        {/* How It Works */}
        <div id="how-it-works" className="mt-24 max-w-5xl w-full text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left bg-[#121212] p-6 rounded-2xl shadow-inner border border-gray-800">
            {[
              {
                step: '1',
                title: 'Upload Your Paper',
                desc: 'Drop your PDF research paper or document directly into our system.',
              },
              {
                step: '2',
                title: 'AI Processes It',
                desc: 'Our models analyze, summarize, and extract insights from your paper.',
              },
              {
                step: '3',
                title: 'Interact & Learn',
                desc: 'Use the chatbot, get summaries, extract code, and more—all in real time.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 border-l-4 border-orange-500 bg-[#1a1a1a] rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute -left-5 top-5 text-orange-500 text-2xl font-bold">{item.step}</div>
                <h4 className="text-xl font-semibold mb-2 ml-4">{item.title}</h4>
                <p className="text-gray-400 ml-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        

        {/* Audience */}
        <div id="audience" className="mt-24 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Built for Every Researcher</h2>
          <p className="text-gray-400 text-lg mb-6">
            Whether you're a first-year undergrad, a PhD scholar, or a professor shaping the next generation, our tool is designed to adapt to your needs and elevate your research game.
          </p>
          <p className="text-orange-400 italic">Your curiosity is limitless—your assistant should be too.</p>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-300 py-6 border-t border-gray-800 mt-20">
          &copy; {new Date().getFullYear()} <span className="text-orange-500">ResearchAI</span>. Built by Abhinay
        </footer>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden z-50">
        <Link to="/dashboard">
          <Button type="primary" icon={<Upload size={16} />}>Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
