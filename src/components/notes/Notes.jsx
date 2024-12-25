import React, { useState, useEffect, useCallback } from 'react';
import { DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    
    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimeoutId(newTimeoutId);
  }, [callback, delay, timeoutId]);

  return debouncedCallback;
};

export const Notes = ({ notes: initialNotes, onUpdate }) => {
  const [localNotes, setLocalNotes] = useState(initialNotes);
  const [lastSavedNotes, setLastSavedNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    setLocalNotes(initialNotes);
    setLastSavedNotes(initialNotes);
  }, [initialNotes]);

  const debouncedUpdate = useDebounce((value) => {
    setIsSaving(true);
    onUpdate(value).finally(() => {
      setIsSaving(false);
      setLastSavedNotes(value);
      setLastSaved(new Date());
      console.log("Notes saved");
    });
  }, 1000);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalNotes(newValue);
    debouncedUpdate(newValue);
  };

  const hasUnsavedChanges = localNotes !== lastSavedNotes;

  return (
    <section id="notes" className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Notes
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {isSaving ? (
              <span className="text-sm text-gray-500">
                Saving...
              </span>
            ) : (
              <div className="flex items-center gap-2">
                {!hasUnsavedChanges && lastSaved && (
                  <>
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-500">
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </span>
                  </>
                )}
                {hasUnsavedChanges && (
                  <span className="text-sm text-amber-500">
                    Unsaved changes
                  </span>
                )}
              </div>
            )}
            <span className="text-sm text-gray-500 border-l border-gray-200 pl-4">
              {localNotes?.length || 0} characters
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <textarea
          value={localNotes}
          onChange={handleChange}
          className="w-full min-h-[120px] sm:min-h-[600px] p-3 sm:p-4 
            border border-gray-200 rounded-lg 
            resize-vertical text-sm sm:text-base
            placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500 focus:border-blue-300
            transition-all duration-200 flex-grow h-full"
          placeholder="Add your notes here..."
        />
      </div>
    </section>
  );
};

export default Notes;