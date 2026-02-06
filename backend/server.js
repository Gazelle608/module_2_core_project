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
import { deleteEmployeeCon, getEmployeesCon, insertEmployeesCon, updateEmployeeCon } from "./controller/empCon.js";



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

app.get('/employees', getEmployeesCon);
app.post('/employees', insertEmployeesCon);
app.patch('/employee/:Employee_id', updateEmployeeCon)
app.delete('/employee/:Employee_id', deleteEmployeeCon)
//basic route to test server
app.get("/", (req, res) => {
  res.send("Welcome!");
});


// Start the server (use PORT from env or fallback to 3000)
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful error handling for server start failures (e.g., port in use)
server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Choose a different PORT or stop the other process.`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});

