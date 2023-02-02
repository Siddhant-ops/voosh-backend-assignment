import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.development' });

import { dbConnect } from '../utils/db';
import { PORT } from '../utils/constants';
import authRouter from '../routes/auth.routes';
import orderRouter from '../routes/order.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();

app.get('/check', (req, res) => {
  return res.status(200).json({ message: 'Server is running!' });
});

app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
