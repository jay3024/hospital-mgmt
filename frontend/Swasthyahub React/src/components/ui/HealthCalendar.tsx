import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay, setYear } from 'date-fns';

interface HealthCalendarProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
}

const HealthCalendar: React.FC<HealthCalendarProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  label,
  error,
  required = false,
  className = "",
  maxDate = new Date(),
  minDate = new Date(1900, 0, 1),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [calendarPosition, setCalendarPosition] = useState<'bottom' | 'top'>('bottom');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(format(date, 'yyyy-MM-dd'));
    setIsOpen(false);
  };

  const handleToggleCalendar = () => {
    if (!isOpen && buttonRef.current) {
      // Check if there's enough space below the button
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const calendarHeight = 320; // Approximate calendar height
      
      if (buttonRect.bottom + calendarHeight > viewportHeight) {
        setCalendarPosition('top');
      } else {
        setCalendarPosition('bottom');
      }
    }
    setIsOpen(!isOpen);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const handleYearChange = (year: number) => {
    setCurrentMonth(prev => setYear(prev, year));
    setIsYearDropdownOpen(false);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    const startYear = Math.max(minDate.getFullYear(), currentYear - 100);
    const endYear = Math.min(maxDate.getFullYear(), currentYear);
    
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    // Add padding days from previous month
    const firstDayOfWeek = start.getDay();
    const paddingDays = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      paddingDays.push(subMonths(start, 1).getDate() - i);
    }

    return { days, paddingDays };
  };

  const isDateDisabled = (date: Date) => {
    const startOfDate = startOfDay(date);
    return isBefore(startOfDate, startOfDay(minDate)) || isBefore(startOfDay(maxDate), startOfDate);
  };

  const { days, paddingDays } = getDaysInMonth();

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
                 <button
           ref={buttonRef}
           type="button"
           onClick={handleToggleCalendar}
           className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
             error 
               ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
               : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
           } ${className}`}
         >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className={selectedDate ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
                {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : placeholder}
              </span>
            </div>
          </div>
        </button>

                 {isOpen && (
           <div
             ref={calendarRef}
             className={`absolute left-0 w-full sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 ${
               calendarPosition === 'bottom' 
                 ? 'top-full mt-1' 
                 : 'bottom-full mb-1'
             }`}
           >
                         {/* Calendar Header */}
             <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700">
               <button
                 type="button"
                 onClick={() => handleMonthChange('prev')}
                 className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                 disabled={isSameMonth(currentMonth, minDate)}
               >
                 <ChevronLeft className="w-4 h-4" />
               </button>
               
               <div className="flex items-center space-x-2">
                 <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                   {format(currentMonth, 'MMMM')}
                 </h3>
                 
                 {/* Year Dropdown */}
                 <div className="relative" ref={yearDropdownRef}>
                   <button
                     type="button"
                     onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                     className="flex items-center space-x-1 px-2 py-1 text-sm sm:text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                   >
                     <span>{format(currentMonth, 'yyyy')}</span>
                     <ChevronDown className={`w-3 h-3 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
                   </button>
                   
                   {isYearDropdownOpen && (
                     <div className="absolute top-full left-0 mt-1 w-24 max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                       {generateYearOptions().map(year => (
                         <button
                           key={year}
                           type="button"
                           onClick={() => handleYearChange(year)}
                           className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                             year === currentMonth.getFullYear()
                               ? 'bg-primary text-white'
                               : 'text-gray-700 dark:text-gray-300'
                           }`}
                         >
                           {year}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
               
               <button
                 type="button"
                 onClick={() => handleMonthChange('next')}
                 className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                 disabled={isSameMonth(currentMonth, maxDate)}
               >
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>

                           {/* Calendar Grid */}
               <div className="p-2 sm:p-4">
                 {/* Day Headers */}
                 <div className="grid grid-cols-7 gap-1 mb-2">
                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                     <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1 sm:py-2">
                       {day}
                     </div>
                   ))}
                 </div>
 
                 {/* Calendar Days */}
                 <div className="grid grid-cols-7 gap-1">
                   {/* Padding days from previous month */}
                   {paddingDays.map((day, index) => (
                     <div key={`padding-${index}`} className="h-8 sm:h-10 flex items-center justify-center text-gray-300 dark:text-gray-600 text-xs sm:text-sm">
                       {day}
                     </div>
                   ))}
 
                   {/* Current month days */}
                   {days.map(day => {
                     const isSelected = selectedDate && isSameDay(day, selectedDate);
                     const isCurrentDay = isToday(day);
                     const isDisabled = isDateDisabled(day);
 
                     return (
                       <button
                         key={day.toISOString()}
                         type="button"
                         onClick={() => !isDisabled && handleDateSelect(day)}
                         disabled={isDisabled}
                         className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                           isSelected
                             ? 'bg-primary text-white'
                             : isCurrentDay
                             ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-700'
                             : isDisabled
                             ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                         }`}
                       >
                         {format(day, 'd')}
                       </button>
                     );
                   })}
                 </div>
               </div>

                         {/* Quick Actions */}
             <div className="p-2 sm:p-4 border-t border-gray-200 dark:border-gray-700">
               <div className="flex space-x-2">
                 <button
                   type="button"
                   onClick={() => handleDateSelect(new Date())}
                   className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                 >
                   Today
                 </button>
                 <button
                   type="button"
                   onClick={() => setIsOpen(false)}
                   className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                 >
                   Close
                 </button>
               </div>
             </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default HealthCalendar;
