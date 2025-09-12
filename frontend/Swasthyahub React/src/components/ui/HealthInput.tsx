
import React, { forwardRef } from 'react';

interface HealthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  inputSize?: 'sm' | 'md' | 'lg';
}

const HealthInput = forwardRef<HTMLInputElement, HealthInputProps>(({
  label,
  error,
  helper,
  icon,
  rightIcon,
  variant = 'default',
  inputSize = 'md',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full rounded-lg border bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'border-input focus:border-primary focus:ring-primary',
    success: 'border-success focus:border-success focus:ring-success',
    warning: 'border-warning focus:border-warning focus:ring-warning',
    error: 'border-destructive focus:border-destructive focus:ring-destructive',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };
  
  const iconPadding = icon ? 'pl-10' : '';
  const rightIconPadding = rightIcon ? 'pr-10' : '';
  
  const inputClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${iconPadding} ${rightIconPadding} ${className}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-destructive animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-muted-foreground">
          {helper}
        </p>
      )}
    </div>
  );
});

HealthInput.displayName = 'HealthInput';

export default HealthInput;
