import { useState, useMemo } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import BulkActions from './components/BulkActions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTaskStats } from './hooks/useTaskStats';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useTaskOperations } from './hooks/useTaskOperations';
import { LOCAL_STORAGE_KEYS } from './constants';
import type { Task, TaskCategory } from './types';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEYS.TASKS, []);
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastUsedCategory, setLastUsedCategory] = useLocalStorage<TaskCategory>(LOCAL_STORAGE_KEYS.LAST_CATEGORY, 'Work');

  const { stats, taskCounts } = useTaskStats(tasks);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
  const taskOperations = useTaskOperations(tasks, setTasks);

  const handleAddTask = (task: Task) => {
    taskOperations.addTask(task);
    setLastUsedCategory(task.category);
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (filter !== 'All') {
      filtered = filtered.filter(task => task.category === filter);
    }

    if (debouncedSearchTerm.trim()) {
      const search = debouncedSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search) ||
        task.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [tasks, filter, debouncedSearchTerm]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini Task Tracker</h1>
        <p className="tagline">Organize your day</p>
        {stats.totalCount > 0 && (
          <div className="stats">
            {stats.completedCount} of {stats.totalCount} tasks completed
          </div>
        )}
      </header>

      <main className="app-main">
        <TaskForm
          onAddTask={handleAddTask}
          lastUsedCategory={lastUsedCategory}
        />

        {tasks.length > 0 && (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              taskCount={tasks.length}
            />

            <FilterBar
              activeFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />

            <BulkActions
              tasks={tasks}
              onToggleAll={taskOperations.toggleAllTasks}
              onDeleteCompleted={taskOperations.deleteCompletedTasks}
              onClearAll={taskOperations.clearAllTasks}
            />
          </>
        )}

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={taskOperations.toggleTaskComplete}
          onUpdateTask={taskOperations.updateTask}
          onDeleteTask={taskOperations.deleteTask}
        />

        {tasks.length > 0 && filteredTasks.length === 0 && searchTerm && (
          <div className="no-results">
            No tasks found matching "{searchTerm}"
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
