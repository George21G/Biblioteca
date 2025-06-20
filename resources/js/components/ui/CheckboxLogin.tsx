import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, id, ...props }, ref) => {
    const checkboxClasses = [
      'peer h-4 w-4 rounded border border-slate-300 text-blue-600',
      'focus:ring-2 focus:ring-blue-500/20',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    ].join(' ');

    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className={checkboxClasses}
            {...props}
          />
          <Check 
            className="absolute inset-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" 
            aria-hidden="true"
          />
        </div>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';