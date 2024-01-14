import express from 'express';
import cors from 'cors';
import Pino from 'pino-http';
import { createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById } from './queries'

const app = express();
const logger = Pino({
  level: 'info',
});

app.use(cors());
app.use(logger);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello World');
})

app.get('/ping', (_req, res) => {
  console.log('pinged here');
  res.send('pong')
});

interface TaskReq {
  title: string;
  description: string;
  status: string;
}

app.post('/', async (req, res) => {
  const { title, description, status } = req.body as TaskReq;
  try {
    const result = await createTask(title, description, status)
    return res.status(201).json({ result })
  } catch (err) {
    return res.status(500).json({ err })
  }
})

app.get('/tasks', async (_req, res) => {
  try {
    const result = await getAllTasks();
    return res.status(200).json({ result })
  } catch (err) {
    return res.status(500).json({ err })
  }
})

app.get('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const result = await getTaskById(taskId)
    return res.status(200).json({ result })
  } catch (err) {
    return res.status(500).json({ err })
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const result = await deleteTaskById(taskId)
    if (result) {
      return res.status(200).json({ message: 'Succesfully deleted' });
    } else {
      return res.status(204).json({ message: 'Task not found' });
    }
  } catch (err) {
    return res.status(500).json({ err })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});