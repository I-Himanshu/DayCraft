import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

const DateSelector = ({ selectedDate, onDateSelect }) => {
  const scrollContainerRef = useRef(null);
  
  const getDates = () => {
    const dates = [];
    for (let i = -3; i <= 2; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 120;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const formatDate = (date) => {
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
    return { weekday, month, day };
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getRelativeDay = (date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    switch (diffDays) {
      case -1: return 'Yesterday';
      case 0: return 'Today';
      case 1: return 'Tomorrow';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Current Date Display */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              {new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }).format(selectedDate)}
            </h2>
          </div>
          <button 
            onClick={() => onDateSelect(new Date())}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Today
          </button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto gap-2 scroll-smooth px-2"
          >
            {getDates().map((date) => {
              const { weekday, month, day } = formatDate(date);
              const relativeDay = getRelativeDay(date);
              const isSelected = date.toDateString() === selectedDate.toDateString();
              
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => onDateSelect(date)}
                  className={`
                    flex-shrink-0 px-4 py-3 rounded-lg transition-all duration-200
                    hover:bg-gray-50 relative group
                    ${isToday(date) ? 'bg-blue-50' : ''}
                    ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  `}
                >
                  <div className="flex flex-col items-center min-w-[60px] gap-0.5">
                    <span className={`text-xs font-medium ${isToday(date) ? 'text-blue-500' : 'text-gray-500'}`}>
                      {weekday}
                    </span>
                    <span className={`text-xl font-semibold ${isSelected ? 'text-blue-500' : 'text-gray-900'}`}>
                      {day}
                    </span>
                    <span className="text-xs text-gray-500">
                      {relativeDay || month}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
