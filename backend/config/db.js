// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import mysql2 with promise support so we can use async/await
import mysql from "mysql2/promise";

// Create a connection pool to the hr_management_system database
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Th!na2003",
  database: process.env.DB_NAME || "hr_management_system",
});

// ✅ This pool will be reused in all route files

// Provide a default export for legacy files that import `db` as default
export default pool;


