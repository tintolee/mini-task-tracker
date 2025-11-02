import { memo } from 'react';
import type { BulkActionsProps } from '../types';

const BulkActions = memo<BulkActionsProps>(({ tasks, onToggleAll, onDeleteCompleted, onClearAll }) => {
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  if (totalCount === 0) return null;

  return (
    <div className="bulk-actions">
      <button
        onClick={onToggleAll}
        className="bulk-button"
        title={allCompleted ? 'Mark all as incomplete' : 'Mark all as complete'}
      >
        {allCompleted ? '☐' : '☑'} {allCompleted ? 'Uncheck All' : 'Check All'}
      </button>

      {completedCount > 0 && (
        <button
          onClick={onDeleteCompleted}
          className="bulk-button danger"
          title={`Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}`}
        >
          🗑️ Clear Completed ({completedCount})
        </button>
      )}

      <button
        onClick={onClearAll}
        className="bulk-button danger"
        title="Delete all tasks"
      >
        🗑️ Clear All
      </button>
    </div>
  );
});

BulkActions.displayName = 'BulkActions';

export default BulkActions;