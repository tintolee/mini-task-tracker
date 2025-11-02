import { useState, useRef, useEffect, memo } from 'react';
import { TASK_CATEGORIES } from '../constants';
import { generateTaskId } from '../utils';
import type { TaskFormProps, TaskCategory } from '../types';

const TaskForm = memo<TaskFormProps>(({ onAddTask, lastUsedCategory }) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<TaskCategory>(lastUsedCategory || TASK_CATEGORIES[0]);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (lastUsedCategory) {
      setCategory(lastUsedCategory);
    }
  }, [lastUsedCategory]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask = {
      id: generateTaskId(),
      title: title.trim(),
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    setTitle('');

    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as TaskCategory);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="task-input"
          required
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-select"
        >
          {TASK_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="add-button">
          Add Task
        </button>
      </div>
    </form>
  );
});

TaskForm.displayName = 'TaskForm';

export default TaskForm;