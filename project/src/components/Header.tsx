import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center mb-2">
        <FileText className="text-blue-600 mr-2" size={32} />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Text Summarizer
        </h1>
      </div>
      <p className="text-gray-600 max-w-xl mx-auto">
        Turn lengthy content into concise summaries with our AI-powered text summarizer
      </p>
    </header>
  );
};

export default Header;