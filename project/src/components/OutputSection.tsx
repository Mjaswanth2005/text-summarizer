import React, { useRef } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface OutputSectionProps {
  summary: string;
  originalTextLength: number;
}

const OutputSection: React.FC<OutputSectionProps> = ({ summary, originalTextLength }) => {
  const [copied, setCopied] = React.useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate reduction percentage
  const calculateReduction = () => {
    if (!originalTextLength || !summary) return 0;
    const reduction = 100 - (summary.length / originalTextLength) * 100;
    return Math.round(reduction);
  };

  const reductionPercentage = calculateReduction();

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors duration-200"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check size={16} className="mr-1 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardCopy size={16} className="mr-1" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200 min-h-[100px]" ref={summaryRef}>
        {summary}
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div>Characters: {summary.length}</div>
        <div className="font-medium text-blue-600">
          {reductionPercentage > 0 ? `${reductionPercentage}% reduction` : 'No reduction'}
        </div>
      </div>
    </div>
  );
};

export default OutputSection;