import { db } from './database';

const createTask = (
  title: string, description: string, status: string) => {
    return db.none(`INSERT INTO Tasks (title, description, status)
                   VALUES ($1, $2, $3)`, [title, description, status])
}

const getAllTasks = () => {
  return db.any(`SELECT * FROM Tasks;`)
}

const getTaskById = (taskId: string) => {
  return db.one(`SELECT * FROM Tasks WHERE id = $1`, taskId)
}

const deleteTaskById = (taskId: string) => {
  return db.none(`DELETE FROM Tasks WHERE id = $1`, taskId)
}

export { createTask, getAllTasks, getTaskById, deleteTaskById };

/*
 CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL
);
*/