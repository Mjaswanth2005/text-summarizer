import React from 'react';
import { SummaryLength } from '../types';

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSummarize: () => void;
  isLoading: boolean;
  error: string | null;
  summaryLength: SummaryLength;
  setSummaryLength: (length: SummaryLength) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  handleSummarize,
  isLoading,
  error,
  summaryLength,
  setSummaryLength
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300">
      <div className="mb-4">
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
          Your Text
        </label>
        <textarea
          id="input-text"
          className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          placeholder="Paste your text here to summarize..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>Characters: {inputText.length}</span>
          <div className="flex space-x-4">
            <span>Summary Length:</span>
            <div className="flex space-x-2">
              <button
                className={`px-2 py-1 rounded text-xs font-medium ${
                  summaryLength === 'short'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={() => setSummaryLength('short')}
              >
                Short
              </button>
              <button
                className={`px-2 py-1 rounded text-xs font-medium ${
                  summaryLength === 'medium'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={() => setSummaryLength('medium')}
              >
                Medium
              </button>
              <button
                className={`px-2 py-1 rounded text-xs font-medium ${
                  summaryLength === 'long'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={() => setSummaryLength('long')}
              >
                Long
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-300 flex items-center justify-center"
        onClick={handleSummarize}
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Summarizing...
          </>
        ) : (
          'Summarize'
        )}
      </button>
    </div>
  );
};

export default InputSection;