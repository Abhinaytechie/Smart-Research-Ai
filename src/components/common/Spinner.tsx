import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'white' | 'gray';
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'orange',
}) => {
  // Size styles
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  // Color styles
  const colorMap = {
    orange: 'border-orange-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent',
  };

  return (
    <div
      className={`inline-block rounded-full animate-spin ${sizeMap[size]} ${colorMap[color]}`}
      role="status"
      aria-label="loading"
    />
  );
};

export default Spinner;