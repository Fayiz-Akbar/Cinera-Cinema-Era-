// Frontend/src/components/Common/Input.jsx
// (PJ 1 - GATEKEEPER) - UI Kit Input

import React from 'react';

const Input = ({ label, id, type = 'text', className = '', ...props }) => {
  
  const baseClasses = "relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors";
  const finalClasses = `${baseClasses} ${className}`;

  // Cek jika ini adalah textarea (untuk reusability)
  const isTextArea = type === 'textarea';

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          rows="3"
          className={finalClasses}
          {...props}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          className={finalClasses}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;