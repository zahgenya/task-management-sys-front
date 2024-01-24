import { db } from './database';

const createTask = async (
  title: string,
  description: string,
  status: string
) => {
  try {
    await db.none(
      `INSERT INTO Tasks (title, description, status)
                   VALUES ($1, $2, $3)`,
      [title, description, status]
    );
  } catch (err) {
    throw err;
  }
};

const getAllTasks = async () => {
  try {
    await db.any(`SELECT * FROM Tasks;`);
  } catch (err) {
    throw err;
  }
};

const getTaskById = async (taskId: string) => {
  try {
    await db.one(`SELECT * FROM Tasks WHERE id = $1`, taskId);
  } catch (err) {
    throw err;
  }
};

const deleteTaskById = async (taskId: string) => {
  try {
    await db.none(`DELETE FROM Tasks WHERE id = $1`, taskId);
  } catch (err) {
    throw err;
  }
};

const updateTaskById = async (taskId: string, method: string) => {
  try {
    await db.none(`UPDATE Tasks SET status = $1 WHERE id = $2`, [
      method,
      taskId,
    ]);

    const updatedTask = await db.one(
      `SELECT * FROM Tasks WHERE id = $1`,
      taskId
    );
    return updatedTask;
  } catch (err) {
    throw err;
  }
};

const getAllTestTasks = async () => {
  try {
    await db.any(`SELECT * FROM testTasks;`);
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
  getAllTestTasks,
};

/*
 CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL
);
*/
