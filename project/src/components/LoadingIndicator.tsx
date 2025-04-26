import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div 
        className={`${sizeClasses[size]} rounded-full border-blue-600 border-t-transparent animate-spin`}
        role="status" 
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingIndicator;