import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";

export const TodoItem = ({ todo, onToggle, onDelete }) => (
  <div className="flex items-center gap-4 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
    <div
      onClick={() => onToggle(todo.id)}
      className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
        todo.completed
          ? 'bg-green-500 border-green-500'
          : 'border-blue-500'
      }`}
    >
      {todo.completed && <CheckIcon className="w-4 h-4 text-white" />}
    </div>
    <span
      className={`flex-1 ${
        todo.completed ? 'line-through text-gray-500' : ''
      }`}
    >
      {todo.text}
    </span>
    <button
      onClick={() => onDelete(todo.id)}
      className="text-red-500 hover:text-red-600 transition-colors"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  </div>
);