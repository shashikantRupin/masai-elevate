import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/Weather.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
          aria-label="City name"
        />
        <button type="submit" className="search-button" aria-label="Search">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;