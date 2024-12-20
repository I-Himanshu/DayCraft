// src/components/todos/TodoList.jsx
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onToggle, onDelete, onAdd }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <section id="todos" className="bg-white rounded-xl shadow-sm border border-secondary-200">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardDocumentListIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary-900">
              Todos
            </h2>
          </div>
          <span className="text-sm text-secondary-500">
            {completedTodos.length}/{todos.length} done
          </span>
        </div>
      </div>

      {/* Todo Form */}
      <div className="p-4 sm:p-6 border-b border-secondary-200">
        <TodoForm onAdd={onAdd} />
      </div>

      {/* Todo List */}
      <div className="divide-y divide-secondary-100 max-h-[60vh] overflow-y-auto">
        {/* Pending Todos */}
        {pendingTodos.length > 0 && (
          <div className="p-4 sm:p-6 space-y-2">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <div className="p-4 sm:p-6 bg-secondary-50/50 space-y-2">
            <h3 className="text-sm font-medium text-secondary-500 mb-3">
              Completed ({completedTodos.length})
            </h3>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="p-4 sm:p-6 text-center">
            <p className="text-secondary-500 text-sm">
              No todos yet. Add one above to get started!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};