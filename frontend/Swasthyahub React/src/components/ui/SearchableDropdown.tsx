
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SearchableDropdownProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Search and select...",
  label,
  error,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleOptionSelect = (option: Option) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div
          className={`
            flex items-center w-full px-4 py-3 border rounded-lg bg-background cursor-pointer transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
            ${isOpen ? 'border-primary ring-2 ring-primary/20' : 'border-input'}
            ${error ? 'border-destructive' : ''}
          `}
          onClick={handleInputClick}
        >
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          
          <input
            ref={inputRef}
            type="text"
            value={isOpen ? searchTerm : selectedOption?.label || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`
                    flex items-center px-4 py-3 cursor-pointer transition-colors duration-150
                    ${index === highlightedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}
                    ${option.value === value ? 'bg-primary/10 text-primary font-medium' : ''}
                  `}
                  onClick={() => handleOptionSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.icon && (
                    <div className="mr-3 text-muted-foreground">
                      {option.icon}
                    </div>
                  )}
                  <span>{option.label}</span>
                  {option.value === value && (
                    <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-muted-foreground">
                No options found
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2 animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchableDropdown;
