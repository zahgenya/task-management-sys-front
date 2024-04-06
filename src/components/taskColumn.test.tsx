import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TaskColumn from './taskColumn';
import taskService from '../services/tasks';
import { Task, status } from '../types';

jest.mock('../services/tasks');

describe('TaskColumn Component', () => {
  let tasks: Task[];
  let setTasks: jest.Mock;

  beforeEach(() => {
    tasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        status: status.toDo,
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        status: status.inProgress,
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        status: status.finished,
      },
    ];
    setTasks = jest.fn();
  });

  it('renders the component with tasks', () => {
    const { getByText } = render(<TaskColumn tasks={tasks} setTasks={setTasks} />);
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
    expect(getByText('Task 3')).toBeInTheDocument();
  });

  it('handles clicking on In Progress button correctly', async () => {
    (taskService.updateTask as jest.Mock<Promise<any>>).mockResolvedValueOnce({});
    const { getByTestId } = render(<TaskColumn tasks={tasks} setTasks={setTasks} />);
    fireEvent.click(getByTestId('inProgressButton'));

    await waitFor(() => {
      expect(taskService.updateTask).toHaveBeenCalledWith("1", status.inProgress);
      expect(setTasks).toHaveBeenCalledTimes(1);
    });
  });

  it('handles clicking on Finished button correctly', async () => {
    (taskService.updateTask as jest.Mock<Promise<any>>).mockResolvedValueOnce({});
    const { getByTestId } = render(<TaskColumn tasks={tasks} setTasks={setTasks} />);
    fireEvent.click(getByTestId('finishedButton'));

    await waitFor(() => {
      expect(taskService.updateTask).toHaveBeenCalledWith("2", status.finished);
      expect(setTasks).toHaveBeenCalledTimes(1);
    });
  });

  it('handles clicking on Delete button correctly', async () => {
    (taskService.deleteTask as jest.Mock<Promise<any>>).mockResolvedValueOnce({});
    const { getByTestId } = render(<TaskColumn tasks={tasks} setTasks={setTasks} />);
    fireEvent.click(getByTestId('deleteButton'));

    await waitFor(() => {
      expect(taskService.deleteTask).toHaveBeenCalledWith("3");
      expect(setTasks).toHaveBeenCalledTimes(2);
    });
  });
});
