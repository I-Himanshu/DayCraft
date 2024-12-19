// src/App.jsx
import { Header } from './components/layout/Header';
import { Schedule } from './components/schedule/Schedule';
import { TodoList } from './components/todos/TodoList';
import { Notes } from './components/notes/Notes';
import { usePlanner } from './hooks/usePlanner';

export default function App() {
  const {
    schedule,
    todos,
    notes,
    updateSchedule,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateNotes,
  } = usePlanner();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Schedule schedule={schedule} updateSchedule={updateSchedule} />
        <TodoList
          todos={todos}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <Notes notes={notes} onUpdate={updateNotes} />
      </main>
    </div>
  );
}
