import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

/* =========================================================
   POST: Add attendance record
   Endpoint: POST /api/attendance
   ========================================================= */
router.post("/", async (req, res) => {
  try {
    // Step 1: Extract data sent from the frontend
    const { employeeId, date, status } = req.body;

    // Step 2: Validate required fields
    if (!employeeId || !date || !status) {
      return res.status(400).json({
        error: "Employee ID, date, and status are required",
      });
    }

    // Step 3: Insert attendance record into the database
    const sql = `
      INSERT INTO attendance (Employee_id, Attendance_Date, Status)
      VALUES (?, ?, ?)
    `;
    await pool.execute(sql, [employeeId, date, status]);

    // Step 4: Send success response
    res.json({ message: "Attendance recorded successfully" });
  } catch (error) {
    // Step 5: Handle database or server errors
    res.status(400).json({ error: error.message });
  }
});

/* =========================================================
   PATCH: Update attendance status
   Endpoint: PATCH /api/attendance/:id
   ========================================================= */
router.patch("/:id", async (req, res) => {
  try {
    // Step 1: Get attendance record ID from URL
    const attendanceId = req.params.id;

    // Step 2: Get updated status from request body
    const { status } = req.body;

    // Step 3: Validate input
    if (!status) {
      return res.status(400).json({
        error: "Attendance status is required",
      });
    }

    // Step 4: Update attendance record in the database
    const sql = `
      UPDATE attendance
      SET Status = ?
      WHERE Attendance_id = ?
    `;
    const [result] = await pool.execute(sql, [status, attendanceId]);

    // Step 5: Check if record exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Attendance record not found",
      });
    }

    // Step 6: Send success response
    res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    // Step 7: Handle errors
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   DELETE: Remove attendance record
   Endpoint: DELETE /api/attendance/:id
   ========================================================= */
router.delete("/:id", async (req, res) => {
  try {
    // Step 1: Get attendance record ID from URL
    const attendanceId = req.params.id;

    // Step 2: Delete attendance record from database
    const sql = `
      DELETE FROM attendance
      WHERE Attendance_id = ?
    `;
    const [result] = await pool.execute(sql, [attendanceId]);

    // Step 3: Check if record exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Attendance record not found",
      });
    }

    // Step 4: Send success response
    res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    // Step 5: Handle errors
    res.status(500).json({ error: error.message });
  }
});
export default router;
