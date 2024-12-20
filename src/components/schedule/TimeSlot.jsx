import { TrashIcon } from "@heroicons/react/20/solid";

export const TimeSlot = ({ time, event, onUpdate, onDelete }) => (
  <div className="flex items-center gap-4 p-4 sm:p-6 group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex-shrink-0 w-20 sm:w-24">
      <span className="text-lg sm:text-xl font-semibold text-secondary-700">
        {time}
      </span>
    </div>

    <input
      type="text"
      value={event}
      onChange={(e) => onUpdate(time, e.target.value)}
      className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base 
        text-secondary-900 placeholder-secondary-400 transition-colors duration-200"
      placeholder="Add event details..."
    />

    <button
      onClick={onDelete}
      className="p-2 text-secondary-400 hover:text-danger-500 rounded-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      aria-label="Delete time slot"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  </div>
);
