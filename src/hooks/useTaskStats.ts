import { useMemo } from 'react';
import type { Task, TaskCounts } from '../types';

export const useTaskStats = (tasks: Task[]) => {
  const stats = useMemo(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;
    const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      completedCount,
      totalCount,
      completionRate,
      hasCompletedTasks: completedCount > 0,
      allCompleted: totalCount > 0 && completedCount === totalCount,
    };
  }, [tasks]);

  const taskCounts = useMemo((): TaskCounts => {
    const counts: TaskCounts = { All: tasks.length };
    for (const task of tasks) {
      counts[task.category] = (counts[task.category] || 0) + 1;
    }
    return counts;
  }, [tasks]);

  return { stats, taskCounts };
};