import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        value={props.value ?? ''}
        className={`border p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-offset-1 outline-none transition-all ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-600'
        }`}
      />
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};
