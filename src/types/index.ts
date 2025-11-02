export interface Task {
  id: number;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: string;
}

export type TaskCategory = 'Work' | 'Personal' | 'Health' | 'Learning' | 'Other';

export interface TaskCounts {
  [key: string]: number;
  All: number;
}

export interface TaskFormProps {
  onAddTask: (task: Task) => void;
  lastUsedCategory: TaskCategory;
}

export interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  onUpdateTask: (taskId: number, updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onUpdateTask: (taskId: number, updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  taskCounts: TaskCounts;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  taskCount: number;
}

export interface BulkActionsProps {
  tasks: Task[];
  onToggleAll: () => void;
  onDeleteCompleted: () => void;
  onClearAll: () => void;
}