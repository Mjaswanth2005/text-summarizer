import React, { useState, useMemo } from 'react';
import { SummaryItem, SortOrder } from '../types';
import { Clock, RefreshCw, Trash2, ChevronDown, ChevronUp, Search, Copy, Filter } from 'lucide-react';

interface HistorySectionProps {
  history: SummaryItem[];
  loadFromHistory: (item: SummaryItem) => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  loadFromHistory,
  removeHistoryItem,
  clearHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const filteredAndSortedHistory = useMemo(() => {
    let filtered = history;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = history.filter(item => 
        item.originalText.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'longest':
          return b.originalText.length - a.originalText.length;
        case 'shortest':
          return a.originalText.length - b.originalText.length;
        default:
          return 0;
      }
    });
  }, [history, searchQuery, sortOrder]);

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300">
        <div className="flex items-center">
          <Clock size={20} className="text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">History</h2>
        </div>
        <p className="text-gray-500 text-sm mt-4">No history available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300">
      <div 
        className="flex justify-between items-center cursor-pointer mb-4" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Clock size={20} className="text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">History</h2>
        </div>
        <button 
          className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={isExpanded ? "Collapse history" : "Expand history"}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="mb-4 space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="longest">Longest</option>
                  <option value="shortest">Shortest</option>
                </select>
                <Filter size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4 max-h-[500px] overflow-y-auto">
            {filteredAndSortedHistory.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-700 font-medium">
                    {truncateText(item.originalText)}
                  </p>
                  <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  {truncateText(item.summary, 100)}
                </p>
                <div className="text-xs text-gray-500 mb-2">
                  {item.reductionPercentage > 0 ? `${item.reductionPercentage}% reduction` : 'No reduction'}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => loadFromHistory(item)}
                    className="inline-flex items-center px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs transition-colors duration-200"
                  >
                    <RefreshCw size={12} className="mr-1" />
                    Reload
                  </button>
                  <button
                    onClick={() => handleCopy(item.originalText)}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors duration-200"
                  >
                    <Copy size={12} className="mr-1" />
                    Copy
                  </button>
                  <button
                    onClick={() => removeHistoryItem(item.id)}
                    className="inline-flex items-center px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded text-xs transition-colors duration-200"
                  >
                    <Trash2 size={12} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedHistory.length === 0 && searchQuery && (
            <div className="text-center py-4 text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}

          <button
            onClick={clearHistory}
            className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors duration-200"
          >
            Clear All History
          </button>
        </>
      )}
    </div>
  );
};

export default HistorySection;