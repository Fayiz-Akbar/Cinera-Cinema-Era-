// Frontend/src/components/Common/Button.jsx
// (PJ 1 - GATEKEEPER) - UI Kit Button

import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  
  let baseClasses = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantClasses;

  switch (variant) {
    case 'secondary':
      // Dark Slate / Secondary Color
      variantClasses = 'bg-secondary text-white hover:bg-gray-800 focus:ring-secondary';
      break;
    case 'danger':
      // Red for destructive actions
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'light':
        // Light color, useful for navigation/subtle actions
        variantClasses = 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400';
        break;
    case 'primary':
    default:
      // Golden Siger / Primary Amber Color
      variantClasses = 'bg-primary text-white hover:bg-primary-hover focus:ring-primary';
      break;
  }
  
  // Gabungkan kelas dasar, kelas varian, dan kelas kustom dari props
  const finalClasses = `${baseClasses} ${variantClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;