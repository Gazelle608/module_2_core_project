import db from "../config/db.js";

// Get attendance records for a specific employee
export const getAttendanceByEmployee = (employeeId, callback) => {
  const sql = `
    SELECT Attendance_Date, Status
    FROM attendance
    WHERE Employee_id = ?
  `;

  // Use parameterized query to prevent SQL injection
  db.query(sql, [employeeId], callback);
};
 