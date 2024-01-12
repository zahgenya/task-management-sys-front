import express from 'express';
import cors from 'cors';
import { sql } from '@vercel/postgres';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello World')
})

app.get('/ping', (_req, res) => {
  console.log('pinged here');
  res.send('pong')
});

app.get('/api/create-pets-table', async (_req, res) => {
  try {
    const result = 
      await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`
    return res.status(200).json({ result })
  } catch (err) {
    return res.status(500).json({ err })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});