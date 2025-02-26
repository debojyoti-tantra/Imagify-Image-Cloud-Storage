import express, { urlencoded } from 'express';
import cors from 'cors';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './utils/db.js';

import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import feedbackRoute from './routes/feedbackRoute.js';
import { requireAuth } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(urlencoded({extended:true}));
const corsOptions = {
  origin: process.env.VITE_FRONTEND_URL,
  credentials:true
};
app.use(cors(corsOptions));

app.use('/api/v1/user/', userRoute);
app.use('/api/v1/post/', requireAuth(), postRoute);
app.use('/api/v1/feedback/', requireAuth(), feedbackRoute);

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server listen at http://localhost:${PORT}`);
});
