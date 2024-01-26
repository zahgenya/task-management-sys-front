import { db } from './database';

const tableName = process.env.NODE_ENV === 'test' ? 'testTasks' : 'Tasks';

const createTask = async (
  title: string,
  description: string,
  status: string
) => {
  try {
    await db.none(
      `INSERT INTO ${tableName} (title, description, status)
                   VALUES ($1, $2, $3)`,
      [title, description, status]
    );
  } catch (err) {
    throw err;
  }
};

const getAllTasks = async () => {
  try {
    const tasks = await db.any(`SELECT * FROM ${tableName};`);
    console.log('Table name: ', tableName)
    return tasks
  } catch (err) {
    throw err;
  }
};

const getTaskById = async (taskId: string) => {
  try {
    const task = await db.one(`SELECT * FROM ${tableName} WHERE id = $1`, taskId);
    return task
  } catch (err) {
    throw err;
  }
};

const deleteTaskById = async (taskId: string) => {
  try {
    const taskToDelete = await db.result(
      `DELETE FROM ${tableName} WHERE id = $1`,
      taskId
    );

    if (taskToDelete.rowCount === 0) {
      throw new Error('Task not found');
    }
  } catch (err) {
    throw err;
  }
};

const updateTaskById = async (taskId: string, method: string) => {
  try {
    await db.none(`UPDATE ${tableName} SET status = $1 WHERE id = $2`, [
      method,
      taskId,
    ]);

    const updatedTask = await db.one(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      taskId
    );
    return updatedTask;
  } catch (err) {
    throw err;
  }
};

export {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
};

/*
 CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL
);
*/
