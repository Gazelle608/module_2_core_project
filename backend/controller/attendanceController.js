import { getAttendanceByEmployee } from "../models/attendanceModel.js";

// Handle attendance request for a specific employee
export const getAttendance = (req, res) => {
  const employeeId = req.params.id; // Get ID from URL

  getAttendanceByEmployee(employeeId, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Return attendance records
    res.json(results);
  });
};
 