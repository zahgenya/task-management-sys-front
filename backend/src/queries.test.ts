import { jest, expect, describe, it } from '@jest/globals';
import { getAllTasks, getTaskById, createTask, deleteTaskById, updateTaskById } from './queries';
import { db } from './database';
import { TaskReq, status } from './models/task';

jest.mock('./database', () => {
  const mockDBAny = jest.fn();
  const mockDBOne = jest.fn();
  const mockDBNone = jest.fn();
  const mockDBResult = jest.fn();
  return {
    db: {
      any: mockDBAny,
      one: mockDBOne,
      none: mockDBNone,
      result: mockDBResult,
    },
  };
});

describe('Test getAllTasks', () => {
  it('test query', async () => {
    const expected_value = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'TODO' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
    ];

    (db.any as jest.Mock).mockReturnValueOnce(expected_value);

    const tableName = 'testTasks'
    const result = await getAllTasks()

    expect(db.any).toHaveBeenCalled();
    expect(db.any).toHaveBeenLastCalledWith(`SELECT * FROM ${tableName};`);

    expect(result).toHaveLength(2);
    expect(result).toEqual(expected_value);
  });
});

describe('Test getTaskById', () => {
  it('test query', async () => {
    const expected_value = [
      { id: '1', title: 'Task 1', description: 'Description 1', status: 'TODO' }
    ];

    (db.one as jest.Mock).mockReturnValueOnce(expected_value);
    
    const taskId = '1';
    const tableName = 'testTasks';
    const result = await getTaskById(taskId);

    expect(db.one).toHaveBeenCalled();
    expect(db.one).toHaveBeenLastCalledWith(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      taskId
    );

    expect(result).toEqual(expected_value);
  });
});

describe('Test creating task', () => {
  it('test query', async () => {
    const expected_value = [
      { id: '1', title: 'Task title', description: 'Description 1', status: 'TODO' }
    ];

    (db.one as jest.Mock).mockReturnValueOnce(expected_value);

    const { title, description } = {
      title: 'Test title',
      description: 'Test description',
    } as TaskReq;

    const tableName = 'testTasks'

    const result = await createTask(title, description, status.toDo);

    expect(db.one).toHaveBeenCalled();
    expect(db.one).toHaveBeenLastCalledWith(`INSERT INTO ${tableName} (title, description, status) VALUES ($1, $2, $3) RETURNING id`,
    [title, description, status.toDo]
    );

    expect(result).toEqual({
      title,
      description,
      status: status.toDo,
    });
  });
});

describe('Test deleting task', () => {
  it('test query', async () => {
    const expected_value = [{ message: "Succesfully deleted!" }];

    (db.result as jest.Mock).mockReturnValueOnce(expected_value)

    const taskId = "1";
    const tableName = 'testTasks';

    const result = await deleteTaskById(taskId)

    expect(db.result).toHaveBeenCalled();
    expect(db.result).toHaveBeenCalledWith(`DELETE FROM ${tableName} WHERE id = $1`, taskId)

    expect(result).toEqual({"message":"Succesfully deleted!"})
  })
})

describe('Test updating task', () => {
  it('test query', async () => {
    const expected_value = {
      description: "Test description",
      id: "1",
      status: "FINISHED",
      title: "Test task",
    };

    (db.one as jest.Mock).mockReturnValueOnce(expected_value)

    const taskId = "1";
    const tableName = 'testTasks';
    const method = status.finished;

    const updatedTask = {
      id: taskId,
      title: 'Test task',
      description: 'Test description',
      status: method,
    };

    const result = await updateTaskById(taskId, method)

    expect(db.none).toHaveBeenCalled();
    expect(db.none).toHaveBeenCalledWith(`UPDATE ${tableName} SET status = $1 WHERE id = $2`, [method, taskId]);

    expect(result).toEqual(updatedTask)
  })
})
