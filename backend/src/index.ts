import express from 'express';
import cors from 'cors';
import Pino from 'pino-http';
import favicon from 'express-favicon';
import {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} from './queries';

const app = express();
const logger = Pino({
  level: 'info',
});

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(cors());
app.use(logger);
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5174;

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.get('/ping', (_req, res) => {
  console.log('pinged here');
  res.send('pong');
});

interface TaskReq {
  title: string;
  description: string;
  status: string;
}

app.post('/', async (req, res) => {
  const { title, description, status } = req.body as TaskReq;
  try {
    const result = await createTask(title, description, status);
    return res.status(201).json({ result });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

app.get('/tasks', async (_req, res) => {
  try {
    const result = await getAllTasks();
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const result = await getTaskById(taskId);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await deleteTaskById(taskId);

    return res.status(200).json({ message: "Succesfully deleted!" })
  } catch (err) {

    const errorMessage = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: "Internal Server Error", message: errorMessage });
  }
});

app.put('/:id/:method', async (req, res) => {
  try {
    const taskId = req.params.id;
    const method = req.params.method;

    if (method !== 'TODO' && method !== 'INPROGRESS' && method !== 'FINISHED') {
      return res.status(500).json({ message: 'ERROR: invalid method' });
    }

    const result = await updateTaskById(taskId, method);
    if (result) {
      return res.status(200).json({ result });
    } else {
      return res.status(500).json({ message: 'ERROR: db problem' });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
