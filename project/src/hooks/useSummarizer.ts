import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SummaryItem, SummaryLength } from '../types';
import { summarizeText, calculateReductionPercentage } from '../utils/summarizer';
import { useLocalStorage } from './useLocalStorage';

export const useSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<SummaryItem[]>('summarizer-history', []);
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await summarizeText(inputText, summaryLength);
      setSummary(result);
      
      const reductionPercentage = calculateReductionPercentage(inputText, result);
      
      // Add to history
      const newItem: SummaryItem = {
        id: uuidv4(),
        originalText: inputText,
        summary: result,
        timestamp: Date.now(),
        reductionPercentage
      };
      
      setHistory(prev => [newItem, ...prev.slice(0, 9)]); // Keep only the last 10 items
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadFromHistory = (item: SummaryItem) => {
    setInputText(item.originalText);
    setSummary(item.summary);
  };

  return {
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
  };
};