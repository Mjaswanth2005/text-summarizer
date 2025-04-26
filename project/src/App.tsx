import React from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import HistorySection from './components/HistorySection';
import { useSummarizer } from './hooks/useSummarizer';

function App() {
  const {
    inputText,
    setInputText,
    summary,
    isLoading,
    error,
    history,
    summaryLength,
    setSummaryLength,
    handleSummarize,
    clearHistory,
    removeHistoryItem,
    loadFromHistory
  } = useSummarizer();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2">
            <InputSection 
              inputText={inputText}
              setInputText={setInputText}
              handleSummarize={handleSummarize}
              isLoading={isLoading}
              error={error}
              summaryLength={summaryLength}
              setSummaryLength={setSummaryLength}
            />

            {summary && (
              <OutputSection 
                summary={summary} 
                originalTextLength={inputText.length} 
              />
            )}
          </div>
          
          <div className="md:col-span-1">
            <HistorySection 
              history={history}
              loadFromHistory={loadFromHistory}
              removeHistoryItem={removeHistoryItem}
              clearHistory={clearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;