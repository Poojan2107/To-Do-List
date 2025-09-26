import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';

dotenv.config();

const app = express();
import detect from 'detect-port';
const DEFAULT_PORT = process.env.PORT || 4000;
let PORT = DEFAULT_PORT;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_, res) => res.json({ ok: true, message: 'API is healthy' }));
app.use('/api/tasks', tasksRouter);

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment. Please set it in .env');
}


async function start() {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    }
    PORT = await detect(DEFAULT_PORT);
    if (PORT !== DEFAULT_PORT) {
      console.warn(`Port ${DEFAULT_PORT} is in use, switching to ${PORT}`);
    }
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();


