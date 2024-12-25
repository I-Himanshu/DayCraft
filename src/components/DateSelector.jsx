import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

const DateSelector = ({ selectedDate, onDateSelect }) => {
  const scrollContainerRef = useRef(null);
  
  const getDates = () => {
    return Array.from({ length: 3 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + (i - 1));
      return date;
    });
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    container.scrollBy({
      left: direction === 'left' ? -120 : 120,
      behavior: 'smooth'
    });
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date).split(' ');
  };

  const isToday = (date) => date.toDateString() === new Date().toDateString();

  const getRelativeDay = (date) => {
    const diffDays = Math.round((date - new Date()) / (1000 * 60 * 60 * 24));
    return diffDays === -1 ? 'Yesterday' : diffDays === 0 ? 'Today' : diffDays === 1 ? 'Tomorrow' : '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      {/* Current Date Display */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(selectedDate)}
          </h2>
        </div>
        <button 
          onClick={() => onDateSelect(new Date())}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
        >
          Today
        </button>
      </div>

      {/* Date Selector */}
      <div className="flex items-center justify-between">
        <button onClick={() => scroll('left')} aria-label="Scroll left" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>

        <div ref={scrollContainerRef} className="flex overflow-x-auto gap-2 px-2">
          {getDates().map((date) => {
            const [weekday, month, day] = formatDate(date);
            const relativeDay = getRelativeDay(date);
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-200 hover:bg-gray-50 relative group ${isToday(date) ? 'bg-blue-50' : ''} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              >
                <span className={`text-xs font-medium ${isToday(date) ? 'text-blue-500' : 'text-gray-500'}`}>{weekday}</span>
                <span className={`text-lg font-semibold ${isSelected ? 'text-blue-500' : 'text-gray-900'}`}>{day}</span>
                <span className="text-xs text-gray-500">{relativeDay || month}</span>
              </button>
            );
          })}
        </div>

        <button onClick={() => scroll('right')} aria-label="Scroll right" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
