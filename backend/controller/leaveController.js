import { pool } from "../config/db.js";

const createLeaveCon = async (req, res) => {
  try {
    const { employeeId, leaveDate, reason } = req.body;
    if (!employeeId || !leaveDate || !reason) {
      return res.status(400).json({ error: "Employee ID, leave date, and reason are required" });
    }
    const sql = `
      INSERT INTO leave_request (Employee_id, Leave_date, Reason, Status)
      VALUES (?, ?, ?, 'Pending')
    `;
    await pool.execute(sql, [employeeId, leaveDate, reason]);
    res.json({ message: "Leave request submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLeaveCon = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Leave status is required (Approved / Rejected / Pending)" });
    }
    const sql = `
      UPDATE leave_request
      SET Status = ?
      WHERE Leave_id = ?
    `;
    const [result] = await pool.execute(sql, [status, leaveId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    res.json({ message: "Leave request updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLeaveCon = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const sql = `
      DELETE FROM leave_request
      WHERE Leave_id = ?
    `;
    const [result] = await pool.execute(sql, [leaveId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createLeaveCon, updateLeaveCon, deleteLeaveCon };
import { createLeaveRequest } from "../models/leaveModel.js";

// Handle new leave request
export const requestLeave = (req, res) => {
  // Data has already been validated by middleware
  createLeaveRequest(req.body, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Confirm successful submission
    res.json({
      message: "Leave request submitted successfully"
    });
  });
};
  