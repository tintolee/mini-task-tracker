import { memo } from 'react';
import type { SearchBarProps } from '../types';

const SearchBar = memo<SearchBarProps>(({ searchTerm, onSearchChange, taskCount }) => {
  const getPlaceholder = () => {
    if (taskCount === 0) return "No tasks to search";
    if (taskCount === 1) return "Search 1 task...";
    return `Search ${taskCount} tasks...`;
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={getPlaceholder()}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="search-icon">🔍</div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;