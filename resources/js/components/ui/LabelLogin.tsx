import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string; // Hacer htmlFor obligatorio para mejor accesibilidad
  className?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const baseClasses = [
      'text-sm font-medium text-slate-700 leading-none',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    ].join(' ');

    return (
      <label
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';