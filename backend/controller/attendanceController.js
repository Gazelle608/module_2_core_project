import { pool } from "../config/db.js";

const addAttendanceCon = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date || !status) {
      return res.status(400).json({ error: "Employee ID, date, and status are required" });
    }
    const sql = `
      INSERT INTO attendance (Employee_id, Attendance_Date, Status)
      VALUES (?, ?, ?)
    `;
    await pool.execute(sql, [employeeId, date, status]);
    res.json({ message: "Attendance recorded successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAttendanceCon = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Attendance status is required" });
    }
    const sql = `
      UPDATE attendance
      SET Status = ?
      WHERE Attendance_id = ?
    `;
    const [result] = await pool.execute(sql, [status, attendanceId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAttendanceCon = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const sql = `
      DELETE FROM attendance
      WHERE Attendance_id = ?
    `;
    const [result] = await pool.execute(sql, [attendanceId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addAttendanceCon, updateAttendanceCon, deleteAttendanceCon };
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
 