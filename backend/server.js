// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import Express framework
import express from "express";

// Import CORS to allow frontend access
import cors from "cors";

// Import route files
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRouter from "./routes/attendanceRouter.js";
import leaveRoutes from "./routes/leaveRoute.js";
import payrollRoutes from "./routes/payrollRoute.js";

// Create Express app
const app = express();

// Enable CORS for frontend-backend communication
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Register API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRoutes);
app.use("/api/payroll", payrollRoutes);

// Start the server (use PORT from env or fallback to 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

