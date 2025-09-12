
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
  size: any
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  showText = true, 
  variant = 'default' 
}) => {
  const logoColor = variant === 'white' ? '#ffffff' : 
                   variant === 'dark' ? '#1a1a1a' : '#0066CC';
  const textColor = variant === 'white' ? 'text-white' : 
                   variant === 'dark' ? 'text-gray-900' : 'text-primary';

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Medical Cross Background */}
          <circle cx="20" cy="20" r="18" fill={logoColor} fillOpacity="0.1" />
          <circle cx="20" cy="20" r="16" fill={logoColor} fillOpacity="0.2" />
          
          {/* Medical Cross */}
          <path
            d="M20 8V32M12 20H28"
            stroke={logoColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Heart Symbol Integration */}
          <path
            d="M15 15C15 13 16.5 11.5 18.5 11.5C19.5 11.5 20 12 20 12S20.5 11.5 21.5 11.5C23.5 11.5 25 13 25 15C25 17 20 22 20 22S15 17 15 15Z"
            fill={logoColor}
            fillOpacity="0.8"
          />
          
          {/* Pulse Line */}
          <path
            d="M6 24L8 24L10 20L12 28L14 16L16 24L18 24"
            stroke={logoColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fillOpacity="0.6"
          />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`text-2xl font-bold ${textColor} tracking-tight`}>
            SwasthyaHub
          </h1>
          <p className={`text-xs ${variant === 'white' ? 'text-gray-200' : 'text-muted-foreground'} -mt-1`}>
            Healthcare & Wellness
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
