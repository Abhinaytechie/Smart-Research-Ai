import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'ghost'|'vibrant'|'neon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  className = '',
  fullWidth = false,
}) => {
  // Base styles
  const baseStyles = 'relative flex items-center justify-center rounded-xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:-translate-y-0.5 active:translate-y-0';
  
  // Size styles
  const sizeStyles = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  // Type styles
  const typeStyles = {
  primary: `
    bg-gradient-to-r 
    from-orange-500 
    via-yellow-400 
    to-orange-600 
    hover:from-orange-600 
    hover:via-yellow-500 
    hover:to-orange-700 
    text-black 
    font-semibold 
    shadow-xl 
    shadow-orange-500/30 
    hover:shadow-yellow-500/40 
    border-2 
    border-transparent 
    hover:border-yellow-400 
    transition-all 
    duration-300
  `,

  secondary: `
    bg-gray-900 
    hover:bg-gray-800 
    text-orange-300 
    font-medium 
    border 
    border-orange-400/30 
    shadow-md 
    hover:shadow-orange-300/20 
    transition 
    duration-300
  `,

  ghost: `
    bg-transparent 
    text-orange-400 
    hover:bg-gray-800 
    hover:text-orange-300 
    border 
    border-gray-700 
    transition-all 
    duration-300
  `,

  vibrant: `
    text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium 
    uppercase 
    tracking-wide 
    shadow-lg 
    hover:shadow-white-500/30 
    transform 
    hover:scale-105 
    transition-all 
    duration-300
  `,

  neon: `
    bg-black 
    text-green-400 
    border 
    border-green-500/40 
    hover:bg-green-900/20 
    hover:text-green-300 
    shadow-[0_0_10px_#22c55e] 
    hover:shadow-[0_0_15px_#22c55e] 
    font-semibold 
    transition 
    duration-300
  `
};

  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Disabled styles
  const disabledStyles = (disabled || isLoading) 
    ? 'opacity-60 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${typeStyles[type]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 size={size === 'sm' ? 14 : size === 'md' ? 18 : 22} className="mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;