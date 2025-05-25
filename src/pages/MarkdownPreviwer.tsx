import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const STORAGE_KEY = 'research_notes_markdown';

const defaultMarkdown = `# Welcome to Research Notes ✍️

Start typing your markdown notes here...

## Features:
- Use **bold**, *italic* text
- Add [links](https://example.com)
- Insert code:
\`\`\`js
console.log('Hello, Research!');
\`\`\`

> "Stay curious. Keep learning."
`;

const MarkdownPreviewer: React.FC = () => {
  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || defaultMarkdown;
  });
  const [html, setHtml] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, markdown);
    const rawHtml = marked.parse(markdown, { breaks: true, gfm: true });
    const clean = DOMPurify.sanitize(rawHtml);
    setHtml(clean);
  }, [markdown]);

  const downloadFile = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'research-notes.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Fancy Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-gradient-to-r from-black via-gray-900 to-blue-900 shadow-lg flex items-center justify-between px-6 border-b border-orange-500">
        <h1 className="text-orange-400 font-bold text-2xl">🧠 ResearchAI Notes</h1>
        <button
          onClick={downloadFile}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md shadow-lg font-semibold transition duration-200"
        >
          ⬇️ Download Notes
        </button>
      </header>

      {/* Main Layout */}
      <main className="min-h-screen pt-20 px-6 pb-6 bg-gradient-to-b from-black via-gray-900 to-blue-950 text-white flex flex-col md:flex-row gap-6">
        {/* Markdown Editor */}
        <section className="flex-1 flex flex-col bg-black/30 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl p-4">
          <h2 className="text-xl font-bold text-orange-400 mb-2">📝 Write Notes (Markdown)</h2>
          <textarea
            className="flex-grow bg-gray-900 text-white p-4 font-mono rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            aria-label="Markdown editor"
          />
        </section>

        {/* Markdown Preview */}
        <section className="flex-1 flex flex-col bg-black/30 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl p-4 max-h-screen overflow-auto">
          <h2 className="text-xl font-bold text-orange-400 mb-2">👁️ Live Preview</h2>
          <div
            className="prose prose-invert max-w-none bg-gray-950 p-4 rounded-md border border-gray-800 shadow-inner overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
            aria-live="polite"
          />
        </section>
      </main>
    </>
  );
};

export default MarkdownPreviewer;
