import React from 'react';
import { Todo } from './TodoApp';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import './styles/TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button 
        className="todo-toggle-button" 
        onClick={() => toggleTodo(todo.id)}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed ? (
          <CheckCircle className="check-icon completed" size={20} />
        ) : (
          <Circle className="check-icon" size={20} />
        )}
      </button>
      
      <span className="todo-text">{todo.text}</span>
      
      <button 
        className="todo-delete-button" 
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;