import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import FilterBar from './FilterBar';
import './styles/TodoApp.css';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (e) {
        console.error('Failed to parse todos from localStorage:', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<FilterType>('all');
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    setTodos([...todos, newTodo]);
  };
  
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };
  
  const filteredTodos = getFilteredTodos();
  
  return (
    <div className="todo-app">
      <h1 className="todo-app-title">Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <TodoList 
        todos={filteredTodos} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} 
      />
      <div className="todo-stats">
        <p>
          {todos.filter(todo => !todo.completed).length} items left
        </p>
      </div>
    </div>
  );
};

export default TodoApp;