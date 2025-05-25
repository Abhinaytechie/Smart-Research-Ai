import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const STORAGE_KEY = 'research_notes_markdown';

const defaultMarkdown = `# Welcome to Research Notes ✍️\n\nStart typing your markdown notes here...\n\n## Features:\n- Use **bold**, *italic* text\n- Add [links](https://example.com)\n- Insert code:\n\n\`\`\`js\nconsole.log('Hello, Research!');\n\`\`\`\n\n> "Stay curious. Keep learning."`;

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
  const rawHtml = marked.parse(markdown, { breaks: true, gfm: true });
  const clean = DOMPurify.sanitize(rawHtml);

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Research Notes</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #0f0f0f;
          color: white;
          padding: 2rem;
        }
        pre {
          background-color: #1a1a1a;
          padding: 1rem;
          overflow-x: auto;
        }
        code {
          color: #ffa500;
        }
        h1, h2, h3 {
          color: #ff8c00;
        }
        a {
          color: #61dafb;
        }
      </style>
    </head>
    <body>
      ${clean}
    </body>
    </html>
  `;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'research-notes.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-gradient-to-r from-black via-gray-900 to-blue-900 shadow-lg flex items-center justify-between px-4 md:px-6 border-b border-orange-500">
        <h1 className="text-orange-400 font-bold text-lg md:text-2xl">🧠 ResearchAI Notes</h1>
        <button
          onClick={downloadFile}
          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-md shadow-lg font-semibold transition duration-200 text-sm md:text-base"
        >
          ⬇️ Download
        </button>
      </header>

      {/* Layout */}
      <main className="min-h-screen pt-20 px-3 pb-6 bg-gradient-to-b from-black via-gray-900 to-blue-950 text-white flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Editor */}
        <section className="w-full lg:w-1/2 flex flex-col bg-black/30 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl p-3 md:p-4">
          <h2 className="text-lg md:text-xl font-bold text-orange-400 mb-2">📝 Write Notes</h2>
          <textarea
            className="flex-grow bg-gray-900 text-white p-3 md:p-4 font-mono rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner min-h-[300px]"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            aria-label="Markdown editor"
          />
        </section>

        {/* Preview */}
        <section className="w-full lg:w-1/2 flex flex-col bg-black/30 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl p-3 md:p-4 overflow-auto">
          <h2 className="text-lg md:text-xl font-bold text-orange-400 mb-2">👁️ Live Preview</h2>
          <div
            className="prose prose-invert max-w-none bg-gray-950 p-3 md:p-4 rounded-md border border-gray-800 shadow-inner overflow-auto min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: html }}
            aria-live="polite"
          />
        </section>
      </main>
    </>
  );
};

export default MarkdownPreviewer;
