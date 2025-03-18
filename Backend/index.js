import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import { dbConnect } from "./config/dbConnect.js";


import { AuthRoutes, MovieRoutes,TheaterRoutes } from "./routes/routes.js";
import { v2 as cloudinary } from "cloudinary"

import cookieParser from "cookie-parser";


import  bookingRoutes from './routes/bookingRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------

// MiddleWares
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

// ---------------------------------------------------



// route
app.use('/api/auth', AuthRoutes)
app.use('/api/movies', MovieRoutes)
app.use('/api/theater',TheaterRoutes)

app.use('/api/book', bookingRoutes);




// start server
dbConnect().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server running at port : ${PORT}`);
  });
});

// Error Middleware
app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
