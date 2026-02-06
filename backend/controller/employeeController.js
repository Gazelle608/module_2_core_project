// Import model function
import { getAllEmployees } from "../models/employeeModel.js";

// Handle request to fetch all employees
export const getEmployees = (req, res) => {
  getAllEmployees((err, results) => {
    if (err) {
      // Send error response if database fails
      return res.status(500).json(err);
    }

    // Send employee data to frontend
    res.json(results);
  });
};
 