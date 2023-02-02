import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.development' });

import { dbConnect } from '../utils/db';
import { PORT } from '../utils/constants';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();

app.get('/check', (req, res) => {
  return res.status(200).json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
