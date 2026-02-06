import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

/* =========================================================
   POST: Submit leave request
   Endpoint: POST /api/leave
   ========================================================= */
router.post("/", async (req, res) => {
  try {
    // Step 1: Extract request data from frontend
    const { employeeId, leaveDate, reason } = req.body;

    // Step 2: Validate required fields
    if (!employeeId || !leaveDate || !reason) {
      return res.status(400).json({
        error: "Employee ID, leave date, and reason are required",
      });
    }

    // Step 3: Insert leave request with default Status = 'Pending'
    const sql = `
      INSERT INTO leave_request (Employee_id, Leave_date, Reason, Status)
      VALUES (?, ?, ?, 'Pending')
    `;
    await pool.execute(sql, [employeeId, leaveDate, reason]);

    // Step 4: Send success response
    res.json({ message: "Leave request submitted successfully" });
  } catch (error) {
    // Step 5: Handle database or server errors
    res.status(400).json({ error: error.message });
  }
});

/* =========================================================
   PATCH: Update leave request status
   Endpoint: PATCH /api/leave/:id
   ========================================================= */
router.patch("/:id", async (req, res) => {
  try {
    // Step 1: Get leave request ID from URL
    const leaveId = req.params.id;

    // Step 2: Get new status from request body
    const { status } = req.body;

    // Step 3: Validate status
    if (!status) {
      return res.status(400).json({
        error: "Leave status is required (Approved / Rejected / Pending)",
      });
    }

    // Step 4: Update leave request status in database
    const sql = `
      UPDATE leave_request
      SET Status = ?
      WHERE Leave_id = ?
    `;
    const [result] = await pool.execute(sql, [status, leaveId]);

    // Step 5: Check if leave request exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Leave request not found",
      });
    }

    // Step 6: Send success response
    res.json({ message: "Leave request updated successfully" });
  } catch (error) {
    // Step 7: Handle errors
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   DELETE: Remove leave request
   Endpoint: DELETE /api/leave/:id
   ========================================================= */
router.delete("/:id", async (req, res) => {
  try {
    // Step 1: Get leave request ID from URL
    const leaveId = req.params.id;

    // Step 2: Delete leave request from database
    const sql = `
      DELETE FROM leave_request
      WHERE Leave_id = ?
    `;
    const [result] = await pool.execute(sql, [leaveId]);

    // Step 3: Check if leave request exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Leave request not found",
      });
    }

    // Step 4: Send success response
    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    // Step 5: Handle errors
    res.status(500).json({ error: error.message });
  }
});

export default router;

