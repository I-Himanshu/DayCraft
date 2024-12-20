// src/components/notes/Notes.jsx
import { DocumentTextIcon } from "@heroicons/react/20/solid";

export const Notes = ({ notes, onUpdate }) => (
  <section id="notes" className="bg-white rounded-xl shadow-sm border border-secondary-200">
    {/* Header */}
    <div className="p-4 sm:p-6 border-b border-secondary-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
          <h2 className="text-xl sm:text-2xl font-semibold text-secondary-900">
            Notes
          </h2>
        </div>
        <span className="text-sm text-secondary-500">
          {notes?.length || 0} characters
        </span>
      </div>
    </div>

    {/* Notes Content */}
    <div className="p-4 sm:p-6">
      <textarea
        value={notes}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full min-h-[120px] sm:min-h-[200px] p-3 sm:p-4 
          border border-secondary-200 rounded-lg 
          resize-vertical text-sm sm:text-base
          placeholder:text-secondary-400
          focus:ring-2 focus:ring-primary-500 focus:border-primary-300
          transition-all duration-200"
        placeholder="Add your notes here..."
      />
    </div>
  </section>
);