import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...props}
        value={props.value ?? ''}
        className={`border p-2.5 rounded-lg bg-white outline-none w-full transition-all ${
          error 
            ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-2 focus:ring-blue-600'
        }`}
      >
        <option value="" disabled>Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};
