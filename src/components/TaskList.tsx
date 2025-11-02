import { memo } from 'react';
import TaskItem from './TaskItem';
import type { TaskListProps } from '../types';

const TaskList = memo<TaskListProps>(({ tasks, onToggleComplete, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet. Add your first task!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;