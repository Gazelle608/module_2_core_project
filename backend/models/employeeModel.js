// Import database connection
import db from "../config/db.js";

// Get all employees from the database
export const getAllEmployees = (callback) => {
  const sql = "SELECT * FROM employees";

  // Execute SQL query
  db.query(sql, callback);
};
 