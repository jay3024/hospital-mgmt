
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import HealthButton from './HealthButton';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'success' | 'warning' | 'error';
  closable?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const HealthModal: React.FC<HealthModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  variant = 'default',
  closable = true,
  footer,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, closable]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl mx-4',
  };

  const getHeaderColor = () => {
    switch (variant) {
      case 'success':
        return 'border-b-success';
      case 'warning':
        return 'border-b-warning';
      case 'error':
        return 'border-b-destructive';
      default:
        return 'border-b-border';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={closable ? onClose : undefined}
      />
      
      {/* Modal */}
      <div
        className={`
          relative w-full ${sizeClasses[size]} bg-card border border-border rounded-xl shadow-2xl
          animate-in zoom-in-95 slide-in-from-bottom-4 duration-200
          max-h-[98vh] sm:max-h-[90vh] overflow-hidden flex flex-col
          ${className}
        `}
      >
        {/* Header */}
        {(title || closable) && (
          <div className={`flex items-center justify-between p-3 sm:p-6 border-b-2 ${getHeaderColor()} flex-shrink-0`}>
            {title && (
              <h2 className="text-base sm:text-xl font-semibold text-card-foreground">
                {title}
              </h2>
            )}
            {closable && (
              <button
                onClick={onClose}
                className="p-1 sm:p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-3 sm:p-6 flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end space-x-3 p-3 sm:p-6 border-t border-border bg-muted/30 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthModal;
