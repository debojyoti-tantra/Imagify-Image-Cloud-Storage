import express, {urlencoded} from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './utils/db.js';

import passRoute from './routes/passRoute.js';
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

// Clerk Authentication Middleware
app.use(requireAuth());

// routes
app.use('/api/v1/user/', userRoute);
app.use('/api/v1/post/', postRoute);
app.use('/api/v1/feedback/', feedbackRoute);

// listen the app
app.listen(PORT, () => {
   connectDB();
   console.log(`server listen at http://localhost:${PORT}`);
});