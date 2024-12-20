import { Header } from './components/layout/Header';
import { Schedule } from './components/schedule/Schedule';
import { TodoList } from './components/todos/TodoList';
import { Notes } from './components/notes/Notes';
import DateSelector from './components/DateSelector';
import usePlanner from './hooks/usePlanner';

export default function App() {
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
    <div className="min-h-screen bg-secondary-50 overflow-hidden">
      {/* Header */}
      <Header />

      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Date Selector */}
        <div className="sticky top-[64px] z-30 bg-white border-b border-secondary-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <DateSelector
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Stats Overview */}
            <div className="overflow-x-auto mb-6 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex md:grid md:grid-cols-3 gap-4">
                {/* Schedule Stats */}
                <div className="w-[280px] md:w-auto flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4">
                    <h3 className="text-secondary-600 text-sm font-medium">Schedule Items</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <p className="text-2xl sm:text-3xl font-semibold text-secondary-900">
                        {Object.values(schedule).filter(item => item).length}
                      </p>
                      <p className="text-secondary-500 text-sm">events</p>
                    </div>
                  </div>
                </div>
                
                {/* Tasks Stats */}
                <div className="w-[280px] md:w-auto flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4">
                    <h3 className="text-secondary-600 text-sm font-medium">Tasks</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <p className="text-2xl sm:text-3xl font-semibold text-secondary-900">
                        {todos.length}
                      </p>
                      <p className="text-secondary-500 text-sm">
                        ({todos.filter(todo => todo.completed).length} done)
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Notes Stats */}
                <div className="w-[280px] md:w-auto flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4">
                    <h3 className="text-secondary-600 text-sm font-medium">Notes</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <p className="text-2xl sm:text-3xl font-semibold text-secondary-900">
                        {notes ? '1' : '0'}
                      </p>
                      <p className="text-secondary-500 text-sm">document</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="space-y-6">
              {/* Mobile Todo List */}
              <div className="lg:hidden">
                <TodoList
                  todos={todos}
                  onAdd={addTodo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
              
              {/* Main Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Schedule
                    schedule={schedule}
                    updateSchedule={updateSchedule}
                    addTimeSlot={addTimeSlot}
                    removeTimeSlot={removeTimeSlot}
                  />
                  <Notes
                    notes={notes}
                    onUpdate={updateNotes}
                  />
                </div>
                
                {/* Desktop Todo Sidebar */}
                <div className="hidden lg:block sticky top-[144px]">
                  <TodoList
                    todos={todos}
                    onAdd={addTodo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}