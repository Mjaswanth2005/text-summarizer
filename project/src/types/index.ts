export interface SummaryItem {
  id: string;
  originalText: string;
  summary: string;
  timestamp: number;
  reductionPercentage: number;
}

export type SummaryLength = 'short' | 'medium' | 'long';

export type SortOrder = 'newest' | 'oldest' | 'longest' | 'shortest';

export interface SummarizerState {
  inputText: string;
  summary: string;
  isLoading: boolean;
  error: string | null;
  history: SummaryItem[];
  summaryLength: SummaryLength;
}