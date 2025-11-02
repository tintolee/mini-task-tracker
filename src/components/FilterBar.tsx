import { memo } from 'react';
import { FILTER_CATEGORIES } from '../constants';
import type { FilterBarProps } from '../types';

const FilterBar = memo<FilterBarProps>(({ activeFilter, onFilterChange, taskCounts }) => {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filter by category:</span>
      <div className="filter-buttons">
        {FILTER_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`filter-button ${activeFilter === category ? 'active' : ''}`}
          >
            {category}
            {taskCounts[category] !== undefined && (
              <span className="task-count">({taskCounts[category]})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;