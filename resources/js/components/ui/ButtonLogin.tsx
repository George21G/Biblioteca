import React from 'react';
import { Loader2 } from 'lucide-react';

// Definición de tipos para las variantes y tamaños
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      children,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Clases base del botón
    const baseClasses = [
      'inline-flex items-center justify-center gap-2',
      'rounded-lg font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      className
    ].join(' ');

    // Variantes de estilo
    const variants: Record<ButtonVariant, string> = {
      primary: [
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
        'hover:from-blue-700 hover:to-blue-800',
        'focus-visible:ring-blue-500 shadow-lg hover:shadow-xl',
        'transform hover:-translate-y-0.5'
      ].join(' '),
      secondary: [
        'bg-blue-50 text-blue-700 hover:bg-blue-100',
        'focus-visible:ring-blue-500 border border-blue-200'
      ].join(' '),
      outline: [
        'border border-blue-300 text-blue-700',
        'hover:bg-blue-50 focus-visible:ring-blue-500'
      ].join(' ')
    };

    // Tamaños del botón
    const sizes: Record<ButtonSize, string> = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2 
            className="h-4 w-4 animate-spin mr-2" 
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';