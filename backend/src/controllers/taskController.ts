import { Request, Response } from 'express';
import { Task } from '../models/task';
import { getAllTestTasks } from '../queries';

const tasks: Task[] = [];

export const getTasks = (_req: Request, res: Response) => {
  res.status(200).json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const newTask: Task = req.body;
  res.json(newTask);
};

export const getTestTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTestTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error with fetching data: ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
