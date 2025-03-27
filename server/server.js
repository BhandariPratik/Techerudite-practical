import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import sequelize from "./models/connection.js";
import authRoutes from './routes/auth.routes.js'
import bookingRoutes from './routes/booking.routes.js'

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);


// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(process.env.PORT || 4001, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error)
  });
