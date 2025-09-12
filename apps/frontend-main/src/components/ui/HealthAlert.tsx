
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface HealthAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
  variant? : any
}

const HealthAlert: React.FC<HealthAlertProps> = ({
  type = 'info',
  title,
  message,
  dismissible = true,
  autoClose = false,
  duration = 5000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success text-success-foreground';
      case 'error':
        return 'bg-destructive/10 border-destructive text-destructive-foreground';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning-foreground';
      case 'info':
      default:
        return 'bg-info/10 border-info text-info-foreground';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        flex items-start p-4 border rounded-lg transition-all duration-300 animate-in slide-in-from-top-2
        ${getStyles()} ${className}
      `}
    >
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-medium mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm opacity-90">
          {message}
        </p>
      </div>
      
      {dismissible && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-3 p-1 hover:bg-black/10 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default HealthAlert;
