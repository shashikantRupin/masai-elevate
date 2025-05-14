import React from 'react';
import './styles/FilterBar.css';

interface FilterBarProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter }) => {
  return (
    <div className="filter-bar">
      <button 
        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button 
        className={`filter-button ${filter === 'active' ? 'active' : ''}`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button 
        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;