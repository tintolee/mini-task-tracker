import { useCallback } from 'react';
import type { Task } from '../types';

export const useTaskOperations = (
  tasks: Task[],
  setTasks: (value: Task[] | ((val: Task[]) => Task[])) => void
) => {
  const addTask = useCallback((task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  }, [setTasks]);

  const toggleTaskComplete = useCallback((taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, [setTasks]);

  const updateTask = useCallback((taskId: number, updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? updatedTask : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, [setTasks]);

  const toggleAllTasks = useCallback(() => {
    const allCompleted = tasks.every(task => task.completed);
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, completed: !allCompleted }))
    );
  }, [tasks, setTasks]);

  const deleteCompletedTasks = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  }, [setTasks]);

  const clearAllTasks = useCallback(() => {
    if (globalThis.confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
      setTasks([]);
    }
  }, [setTasks]);

  return {
    addTask,
    toggleTaskComplete,
    updateTask,
    deleteTask,
    toggleAllTasks,
    deleteCompletedTasks,
    clearAllTasks,
  };
};