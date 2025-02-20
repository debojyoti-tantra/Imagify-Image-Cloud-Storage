import express, {urlencoded} from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './utils/db.js';

import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import feedbackRoute from './routes/feedbackRoute.js';
import { requireAuth } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(urlencoded({extended:true}));
const corsOptions = {
   origin: process.env.VITE_FRONTEND_URL,
   credentials:true
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use('/api/v1/user/', userRoute);
app.use('/api/v1/post/', requireAuth(), postRoute);
app.use('/api/v1/feedback/', requireAuth(), feedbackRoute);

app.listen(PORT, async () => {
   await connectDB();
   console.log(`server listen at http://localhost:${PORT}`);
});
