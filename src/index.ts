import express from 'express';
import cors from 'cors';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});