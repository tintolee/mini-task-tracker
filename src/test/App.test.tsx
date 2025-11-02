import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string | number) => store[key] || null,
    setItem: (key: string | number, value: any) => { store[key] = value.toString(); },
    removeItem: (key: string | number) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock
});

describe('Mini Task Tracker', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a task and display it in the task list', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText('No tasks yet. Add your first task!')).toBeInTheDocument();

    const taskInput = screen.getByPlaceholderText('Enter task title...');
    const categorySelect = screen.getByDisplayValue('Work');
    const addButton = screen.getByText('Add Task');

    await user.type(taskInput, 'Test task');
    await user.selectOptions(categorySelect, 'Personal');
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Test task')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Personal(1)' })).toBeInTheDocument();
    });

    expect(screen.queryByText('No tasks yet. Add your first task!')).not.toBeInTheDocument();

    expect(taskInput).toHaveValue('');
    expect(taskInput).toHaveFocus();
  });

  it('should toggle task completion', async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskInput = screen.getByPlaceholderText('Enter task title...');
    const addButton = screen.getByText('Add Task');

    await user.type(taskInput, 'Test task');
    await user.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should filter tasks by category', async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskInput = screen.getByPlaceholderText('Enter task title...');
    const categorySelect = screen.getByDisplayValue('Work');
    const addButton = screen.getByText('Add Task');

    await user.type(taskInput, 'Work task');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(addButton);

    await user.type(taskInput, 'Personal task');
    await user.selectOptions(categorySelect, 'Personal');
    await user.click(addButton);

    expect(screen.getByText('Work task')).toBeInTheDocument();
    expect(screen.getByText('Personal task')).toBeInTheDocument();

    const workFilterButton = screen.getByRole('button', { name: 'Work(1)' });
    await user.click(workFilterButton);

    expect(screen.getByText('Work task')).toBeInTheDocument();
    expect(screen.queryByText('Personal task')).not.toBeInTheDocument();

    const personalFilterButton = screen.getByRole('button', { name: 'Personal(1)' });
    await user.click(personalFilterButton);

    expect(screen.queryByText('Work task')).not.toBeInTheDocument();
    expect(screen.getByText('Personal task')).toBeInTheDocument();
  });

  it('should persist tasks in localStorage', async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    const taskInput = screen.getByPlaceholderText('Enter task title...');
    const addButton = screen.getByText('Add Task');

    await user.type(taskInput, 'Persistent task');
    await user.click(addButton);

    expect(screen.getByText('Persistent task')).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText('Persistent task')).toBeInTheDocument();
  });

  it('should remember last used category', async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskInput = screen.getByPlaceholderText('Enter task title...');
    const categorySelect = screen.getByDisplayValue('Work');
    const addButton = screen.getByText('Add Task');

    await user.type(taskInput, 'Test task');
    await user.selectOptions(categorySelect, 'Personal');
    await user.click(addButton);

    expect(categorySelect).toHaveValue('Personal');
  });
});