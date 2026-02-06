// Import Express Router
import express from "express";

// Import payroll calculation logic function
import { calculatePayroll } from "../logic/payrollLogic.js";

// Import MySQL pool for database interaction
import { pool } from "../config/db.js";

// Create a router instance
const router = express.Router();

/* =========================================================
   POST: Calculate and save payroll
   Endpoint: POST /api/payroll
   ========================================================= */
router.post("/", async (req, res) => {
  try {
    // Step 1: Extract data from frontend request
    const { employeeId, hoursWorked, hourlyRate } = req.body;

    // Step 2: Validate required fields
    if (!employeeId || !hoursWorked || !hourlyRate) {
      return res.status(400).json({
        error: "Employee ID, hours worked, and hourly rate are required",
      });
    }

    // Step 3: Calculate payroll using server-side logic
    const payrollData = calculatePayroll(employeeId, hoursWorked, hourlyRate);

    // Step 4: Save payroll data to MySQL database
    const sql = `
      INSERT INTO payroll
      (employeeId, hoursWorked, hourlyRate, grossPay, tax, netPay)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(sql, [
      payrollData.employeeId,
      payrollData.hoursWorked,
      payrollData.hourlyRate,
      payrollData.grossPay,
      payrollData.tax,
      payrollData.netPay,
    ]);

    // Step 5: Return success response
    res.status(200).json({
      message: "Payroll calculated and saved successfully",
      data: payrollData,
    });
  } catch (error) {
    // Step 6: Handle validation or database errors
    res.status(400).json({ error: error.message });
  }
});

/* =========================================================
   PATCH: Update payroll hours or rate
   Endpoint: PATCH /api/payroll/:id
   ========================================================= */
router.patch("/:id", async (req, res) => {
  try {
    // Step 1: Get payroll record ID from URL
    const payrollId = req.params.id;

    // Step 2: Extract updated values from request body
    const { hoursWorked, hourlyRate } = req.body;

    // Step 3: Validate inputs
    if (!hoursWorked || !hourlyRate) {
      return res.status(400).json({
        error: "Hours worked and hourly rate are required",
      });
    }

    // Step 4: Recalculate payroll using updated values
    const payrollData = calculatePayroll(
      null,
      hoursWorked,
      hourlyRate
    );

    // Step 5: Update payroll record in database
    const sql = `
      UPDATE payroll
      SET hoursWorked = ?, hourlyRate = ?, grossPay = ?, tax = ?, netPay = ?
      WHERE payrollId = ?
    `;
    const [result] = await pool.execute(sql, [
      hoursWorked,
      hourlyRate,
      payrollData.grossPay,
      payrollData.tax,
      payrollData.netPay,
      payrollId,
    ]);

    // Step 6: Check if payroll record exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Payroll record not found",
      });
    }

    // Step 7: Send success response
    res.json({ message: "Payroll updated successfully" });
  } catch (error) {
    // Step 8: Handle errors
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   DELETE: Remove payroll record
   Endpoint: DELETE /api/payroll/:id
   ========================================================= */
router.delete("/:id", async (req, res) => {
  try {
    // Step 1: Get payroll record ID from URL
    const payrollId = req.params.id;

    // Step 2: Delete payroll record from database
    const sql = `
      DELETE FROM payroll
      WHERE payrollId = ?
    `;
    const [result] = await pool.execute(sql, [payrollId]);

    // Step 3: Check if payroll record exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Payroll record not found",
      });
    }

    // Step 4: Send success response
    res.json({ message: "Payroll record deleted successfully" });
  } catch (error) {
    // Step 5: Handle errors
    res.status(500).json({ error: error.message });
  }
});

// Export router for server.js
export default router;
