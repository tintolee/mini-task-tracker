import { useState, useRef, useEffect, memo } from 'react';
import { formatTaskDate } from '../utils';
import type { TaskItemProps } from '../types';

const TaskItem = memo<TaskItemProps>(({ task, onToggleComplete, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(task.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editTitle.trim() && editTitle.trim() !== task.title) {
      onUpdateTask(task.id, { ...task, title: editTitle.trim() });
    } else {
      setEditTitle(task.title); // Reset if no change
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />

        {isEditing ? (
          <div className="task-edit-container">
            <input
              ref={editInputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="task-edit-input"
            />
          </div>
        ) : (
          <div className="task-content">
            <button
              type="button"
              className="task-title-button"
              onDoubleClick={() => setIsEditing(true)}
              onClick={() => setIsEditing(true)}
              title="Click to edit task"
            >
              {task.title}
            </button>
            <div className="task-meta">
              <span className="task-category">{task.category}</span>
              <span className="task-date">{formatTaskDate(task.createdAt)}</span>
            </div>
          </div>
        )}
      </label>

      <div className="task-actions">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="task-action-btn edit"
              title="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="task-action-btn delete"
              title="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;