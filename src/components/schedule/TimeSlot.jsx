import { TrashIcon } from "@heroicons/react/20/solid";

export const TimeSlot = ({ time, event, onUpdate, onDelete }) => (
  <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 group">
    <div className="flex-shrink-0 w-20 sm:w-24">
      <span className="text-sm sm:text-base font-medium text-secondary-700">
        {time}
      </span>
    </div>
    
    <input
      type="text"
      value={event}
      onChange={(e) => onUpdate(time, e.target.value)}
      className="flex-1 bg-transparent border-0 focus:ring-0 text-sm sm:text-base 
        text-secondary-900 placeholder-secondary-400"
      placeholder="Add event details..."
    />
    
    <button
      onClick={onDelete}
      className="p-1.5 text-secondary-400 hover:text-danger-500 rounded-lg 
        opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label="Delete time slot"
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  </div>
);