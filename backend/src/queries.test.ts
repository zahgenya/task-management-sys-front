import { jest, expect, describe, it } from '@jest/globals';
import { getAllTasks, getTaskById, createTask, deleteTaskById, updateTaskById } from './queries';
import { db } from './database';
import { TaskReq, status } from './models/task';

const testAllTask = [{ id: 1 }, { id: 2 }];

jest.mock('./database', () => {
  return {
    db: {
      any: jest.fn(() => testAllTask),
      one: jest.fn((_sql, taskId) => {
        return {
          id: taskId,
          title: 'Test task',
          description: 'Test description',
          status: 'TODO',
        };
      }),
      none: jest.fn(),
      result: jest.fn(() => testAllTask),
    },
  };
});

describe('Test getAllTasks', () => {
  it('test query', async () => {
    const result = await getAllTasks();

    expect(db.any).toHaveBeenCalled();
    expect(db.any).toHaveBeenLastCalledWith(`SELECT * FROM testTasks;`);

    expect(result).toHaveLength(2);
  });
});

describe('Test getTaskById', () => {
  it('test query', async () => {
    const taskId = '1';
    const tableName = 'testTasks';
    const result = await getTaskById(taskId);

    expect(db.one).toHaveBeenCalled();
    expect(db.one).toHaveBeenLastCalledWith(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      taskId
    );

    expect(result).toHaveProperty('id')
    expect(result).toBeDefined();
  });
});

describe('Test creating task', () => {
  it('test query', async () => {
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

    expect(result).toBeDefined()
  });
});

describe('Test deleting task', () => {
  it('test query', async () => {
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
