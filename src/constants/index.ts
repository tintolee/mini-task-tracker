import type { TaskCategory } from '../types';

export const TASK_CATEGORIES: readonly TaskCategory[] = ['Work', 'Personal', 'Health', 'Learning', 'Other'] as const;

export const FILTER_CATEGORIES: readonly string[] = ['All', ...TASK_CATEGORIES] as const;

export const LOCAL_STORAGE_KEYS = {
  TASKS: 'miniTaskTracker_tasks',
  LAST_CATEGORY: 'miniTaskTracker_lastCategory',
} as const;