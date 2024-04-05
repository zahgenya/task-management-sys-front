import axios from "axios";
import { jest, describe, it } from '@jest/globals';
import taskService from './tasks';
import { Task, TaskCreateReq, status } from "../types";
import { apiBaseUrl } from "../constants";

jest.mock('axios');
const mAxios = axios as jest.Mocked<typeof axios>;

describe('Service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('fetching tasks', async () => {
    const mockTasks: Task[] = [
      { id: 1, title: "Task 1", description: "Description 1", status: status.toDo },
      { id: 1, title: "Task 1", description: "Description 1", status: status.toDo }
    ]

    mAxios.get.mockResolvedValueOnce({ data: { result: mockTasks } });

    const tasks = await taskService.getAll();
    expect(tasks).toEqual(mockTasks)
  });

  it('handling fetching error', async () => {
    const errMessage = "Error with fetching: Internal Server Error";

    mAxios.get.mockRejectedValueOnce(new Error(errMessage));

    await expect(taskService.getAll()).rejects.toThrow(errMessage);
  });

  it('handling updating tasks', async () => {
    const taskId = '1';
    const newStatus: status = status.inProgress;

    mAxios.put.mockResolvedValueOnce({ data: {} });
    const result = await taskService.updateTask(taskId, newStatus);

    expect(mAxios.put).toHaveBeenCalledWith(`${apiBaseUrl}/${taskId}/${newStatus}`);
    expect(result).toEqual({});
  })

  it('handling error with updating task', async () => {
    const taskId = '1';
    const invalidStatus: any = 'INVALID'
    const errMessage = "Error with parameters: Invalid status";

    mAxios.put.mockRejectedValueOnce(new Error(errMessage));

    await expect(taskService.updateTask(taskId, invalidStatus)).rejects.toThrow(errMessage);
  })

  it('handling creating task', async () => {
    const taskReq: TaskCreateReq = {
      title: 'Task 1', description: 'Description 1'
    }
    const expectedTask: Task = {
      id: 1, title: 'Task 1', description: 'Description 1', status: status.toDo
    }

    mAxios.post.mockResolvedValueOnce({ data: { result: expectedTask } })
    const result = await taskService.createNewTask(taskReq);

    expect(result).toEqual({result: expectedTask});
  })

  it('handling wrong req body', async () => {
    const wrongTaskReq: any = {
      tittle: 'Task 1', descrription: 123
    }

    const errMessage = "Error with task object";

    mAxios.post.mockRejectedValueOnce(new Error(errMessage));

    await expect(taskService.createNewTask(wrongTaskReq)).rejects.toThrow(errMessage);
  })

  it('handling deleting task', async () => {
    const expectedResponse = [{ message: 'Succesfully deleted!' }];
    const taskId = '1';

    mAxios.delete.mockResolvedValueOnce({ data: expectedResponse });
    const result = await taskService.deleteTask(taskId);

    expect(mAxios.delete).toHaveBeenCalledWith(`${apiBaseUrl}/${taskId}`)

    expect(result).toEqual(expectedResponse);
  })

  it('handling wrong id variable deleting task', async () => {
    const wrongTaskId = '1'
    const errMessage = "Error with id: task does not exist";

    mAxios.delete.mockRejectedValueOnce(new Error(errMessage));

    await expect(taskService.deleteTask(wrongTaskId)).rejects.toThrow(errMessage);
  })
})