import { Schedule } from '../components/schedule/Schedule';
import { TodoList } from '../components/todos/TodoList';
import { Notes } from '../components/notes/Notes';
import DateSelector from '../components/DateSelector';
import usePlanner from '../hooks/usePlanner';
import DailyQuote from '../components/dailyquote/DailyQuote';


export default function Dashboard() {
  const {
    selectedDate,
    setSelectedDate,
    schedule,
    todos,
    notes,
    updateSchedule,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateNotes,
    addTimeSlot,
    removeTimeSlot
  } = usePlanner();

  return (

      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Date Selector */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <DateSelector
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <DailyQuote />
            {/* Stats Overview */}
            <StatsOverview 
              schedule={schedule} 
              todos={todos} 
              notes={notes} 
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mobile Todo List at Top */}
              <div className="lg:hidden space-y-6 mb-6">
                <TodoList
                  todos={todos}
                  onAdd={addTodo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
                <Notes
                  notes={notes}
                  onUpdate={updateNotes}
                />
              </div>

              {/* Schedule Section */}
              <div className="lg:col-span-2 space-y-6">
                <Schedule
                  schedule={schedule}
                  updateSchedule={updateSchedule}
                  addTimeSlot={addTimeSlot}
                  removeTimeSlot={removeTimeSlot}
                />
              </div>
              
              {/* Desktop Sidebar for Todos and Notes */}
              <div className="hidden lg:block sticky top-[144px] space-y-6">
                <TodoList
                  todos={todos}
                  onAdd={addTodo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
                <Notes
                  notes={notes}
                  onUpdate={updateNotes}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

// Stats Overview Component
const StatsOverview = ({ schedule, todos, notes }) => (
  <div className="overflow-x-auto mb-6 -mx-4 px-4 md:mx-0 md:px-0">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Schedule Stats */}
      <StatCard title="Schedule Items" count={Object.values(schedule).filter(item => item).length} description="events" />
      
      {/* Tasks Stats */}
      <StatCard 
        title="Tasks" 
        count={todos.length} 
        description={`(${todos.filter(todo => todo.completed).length} done)`} 
      />
      
      {/* Notes Stats */}
      <StatCard 
        title="Notes" 
        count={notes ? '1' : '0'} 
        description="document" 
      />
    </div>
  </div>
);

// StatCard Component for Reusability
const StatCard = ({ title, count, description }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between transition-transform transform hover:scale-[1.02] duration-200">
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <div className="flex items-baseline gap-1 mt-2">
      <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{count}</p>
      {description && <p className="text-gray-500 text-sm">{description}</p>}
    </div>
  </div>
);
