// src/components/schedule/Schedule.jsx
import { useState } from 'react';
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { TimeSlot } from "./TimeSlot";

export const Schedule = ({ 
  schedule = {}, 
  updateSchedule, 
  addTimeSlot, 
  removeTimeSlot 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTime, setNewTime] = useState('');

  const sortedSchedule = Object.entries(schedule)
    .sort(([timeA], [timeB]) => {
      return new Date(`1970/01/01 ${timeA}`) - new Date(`1970/01/01 ${timeB}`);
    });

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (newTime && !schedule[newTime]) {
      addTimeSlot(newTime);
      setNewTime('');
      setShowAddForm(false);
    }
  };

  return (
    <section id="schedule" className="bg-white rounded-xl shadow-sm border border-secondary-200">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary-900">
              Schedule
            </h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary-600 
              hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Add Time Slot
          </button>
        </div>
      </div>

      {/* Add Time Slot Form */}
      {showAddForm && (
        <div className="p-4 sm:p-6 border-b border-secondary-200 bg-secondary-50">
          <form onSubmit={handleAddSlot} className="flex items-center gap-4">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="flex-1 px-3 py-2 border border-secondary-200 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-300 outline-none"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg 
                hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-secondary-600 hover:bg-secondary-100 
                rounded-lg transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Schedule List */}
      <div className="divide-y divide-secondary-100">
        {sortedSchedule.length === 0 ? (
          <div className="p-4 sm:p-6 text-center text-secondary-500">
            No schedule items yet. Click "Add Time Slot" to get started.
          </div>
        ) : (
          sortedSchedule.map(([time, event]) => (
            <TimeSlot
              key={time}
              time={time}
              event={event}
              onUpdate={updateSchedule}
              onDelete={() => removeTimeSlot(time)}
            />
          ))
        )}
      </div>
    </section>
  );
};