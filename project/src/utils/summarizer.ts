import { SummaryLength } from '../types';

// This is a simple mock summarizer function
// In a real app, you would integrate with an actual summarization API
export const summarizeText = async (text: string, length: SummaryLength): Promise<string> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    // Check if text is empty
    if (!text.trim()) {
      reject(new Error('Please enter some text to summarize'));
      return;
    }
    
    // Simulate processing time
    setTimeout(() => {
      try {
        // Very simple summarization logic based on length setting
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        
        if (sentences.length === 0) {
          resolve(text);
          return;
        }
        
        let summaryLength: number;
        switch (length) {
          case 'short':
            summaryLength = Math.max(1, Math.floor(sentences.length * 0.2));
            break;
          case 'medium':
            summaryLength = Math.max(1, Math.floor(sentences.length * 0.4));
            break;
          case 'long':
            summaryLength = Math.max(1, Math.floor(sentences.length * 0.6));
            break;
          default:
            summaryLength = Math.max(1, Math.floor(sentences.length * 0.4));
        }
        
        const summary = sentences.slice(0, summaryLength).join(' ');
        resolve(summary);
      } catch (error) {
        reject(new Error('Failed to summarize text. Please try again.'));
      }
    }, 1500);
  });
};

export const calculateReductionPercentage = (originalText: string, summary: string): number => {
  if (!originalText) return 0;
  const reduction = 100 - (summary.length / originalText.length) * 100;
  return Math.round(reduction);
};