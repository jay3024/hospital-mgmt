
import React from 'react';

interface HealthCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'success' | 'warning' | 'info';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const HealthCard: React.FC<HealthCardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hoverable = false,
  header,
  icon,
  onClick,
}) => {
  const baseClasses = 'bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'shadow-md dark:shadow-sm',
    elevated: 'shadow-xl hover:shadow-2xl dark:shadow-lg dark:hover:shadow-xl',
    outlined: 'border-2 shadow-none',
    success: 'border-success bg-success/5 shadow-sm',
    warning: 'border-warning bg-warning/5 shadow-sm',
    info: 'border-info bg-info/5 shadow-sm',
  };
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  const hoverClass = hoverable ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {(header || icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            {header && (
              <div className="font-semibold text-gray-900 dark:text-card-foreground">
                {header}
              </div>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default HealthCard;
