import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import isAuthenticated from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.VITE_FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Authentication Fix: Apply `requireAuth()` only to protected routes
app.use("/api/v1/user/", userRoute); // Signup/login should not need authentication
app.use("/api/v1/post/", isAuthenticated, postRoute);
app.use("/api/v1/feedback/", isAuthenticated, feedbackRoute);

(async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully!");
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
})();
