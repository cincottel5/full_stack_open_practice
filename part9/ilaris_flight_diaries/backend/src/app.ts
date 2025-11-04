import express from 'express';
import diaryRouter from './routes/diaries';
import { errorMiddleware } from './middleware';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.use(errorMiddleware);
 
export default app;