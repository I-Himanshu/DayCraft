import { Schedule } from '../components/schedule/Schedule';
import { TodoList } from '../components/todos/TodoList';
import { Notes } from '../components/notes/Notes';
import DateSelector from '../components/DateSelector';
import usePlanner from '../hooks/usePlanner';
import DailyQuote from '../components/dailyquote/DailyQuote';

// Stat Card Component
const StatCard = ({ title, count, description }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <div className="flex items-baseline gap-2 mt-2">
      <span className="text-2xl font-semibold text-gray-900">{count}</span>
      {description && <span className="text-gray-500 text-sm">{description}</span>}
    </div>
  </div>
);

// Stats Overview Component
const StatsOverview = ({ schedule, todos, notes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <StatCard 
      title="Notes" 
      count={notes ? '1' : '0'} 
      description="document" 
    />
    <StatCard 
      title="Tasks" 
      count={todos.length} 
      description={`${todos.filter(todo => todo.completed).length} completed`} 
    />
    <StatCard 
      title="Schedule Items" 
      count={Object.values(schedule).filter(Boolean).length} 
      description="events" 
    />
  </div>
);

export default function Dashboard() {
  const {
    selectedDate,
    setSelectedDate,
    schedule,
    todos,
    notes,
    lastSavedNotesAt,
    updateSchedule,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateNotes,
    addTimeSlot,
    removeTimeSlot
  } = usePlanner();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Date Selector - Fixed at top */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <DateSelector
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Daily Quote */}
        <div className="mb-6">
          <DailyQuote />
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview 
            schedule={schedule} 
            todos={todos} 
            notes={notes} 
          />
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Notes (Mobile: Full width, Desktop: 2/3 width) */}
          <div className="lg:w-2/3 space-y-6 flex-grow">
            {/* Notes always at the top */}
            <Notes
              notes={notes}
              onUpdate={updateNotes}
            />
            
            {/* TodoList only visible on mobile */}
            <div className="lg:hidden">
              <TodoList
                todos={todos}
                onAdd={addTodo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>
          </div>

          {/* Right Column: TodoList and Schedule (Mobile: Hidden, Desktop: 1/3 width) */}
          <div className="hidden lg:block lg:w-1/3 space-y-6">
            <div className="sticky top-24">
              {/* TodoList */}
              <TodoList
                todos={todos}
                onAdd={addTodo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
              
              {/* Schedule (Optional) */}
              <div className="mt-6">
                <Schedule
                  schedule={schedule}
                  updateSchedule={updateSchedule}
                  addTimeSlot={addTimeSlot}
                  removeTimeSlot={removeTimeSlot}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Schedule on mobile (Optional) */}
        <div className="lg:hidden mt-6">
          <Schedule
            schedule={schedule}
            updateSchedule={updateSchedule}
            addTimeSlot={addTimeSlot}
            removeTimeSlot={removeTimeSlot}
          />
        </div>
      </main>
    </div>
  );
}
