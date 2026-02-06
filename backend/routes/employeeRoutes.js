import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

/* =========================================================
   GET: Fetch all employees
   Endpoint: GET /api/employees
   ========================================================= */
router.get("/", async (req, res) => {
  try {
    // Step 1: Query the employees table
    const [employees] = await pool.execute(
      "SELECT Employee_id, Name FROM employees"
    );

    // Step 2: Send the list of employees to the frontend
    res.json(employees);
  } catch (error) {
    // Step 3: Handle database errors
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   PATCH: Update an employee name
   Endpoint: PATCH /api/employees/:id
   ========================================================= */
router.patch("/:id", async (req, res) => {
  try {
    // Step 1: Get employee ID from URL parameter
    const employeeId = req.params.id;

    // Step 2: Get updated name from request body
    const { name } = req.body;

    // Step 3: Validate input
    if (!name) {
      return res.status(400).json({ error: "Employee name is required" });
    }

    // Step 4: Update employee record in the database
    const sql = `
      UPDATE employees
      SET Name = ?
      WHERE Employee_id = ?
    `;
    const [result] = await pool.execute(sql, [name, employeeId]);

    // Step 5: Check if employee exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Step 6: Send success response
    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    // Step 7: Handle database or server errors
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   DELETE: Remove an employee
   Endpoint: DELETE /api/employees/:id
   ========================================================= */
router.delete("/:id", async (req, res) => {
  try {
    // Step 1: Get employee ID from URL parameter
    const employeeId = req.params.id;

    // Step 2: Delete employee from database
    const sql = `
      DELETE FROM employees
      WHERE Employee_id = ?
    `;
    const [result] = await pool.execute(sql, [employeeId]);

    // Step 3: Check if employee exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Step 4: Send success response
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    // Step 5: Handle foreign key constraint errors
    res.status(400).json({
      error:
        "Cannot delete employee. Remove related attendance or leave records first.",
    });
  }
});

export default router;
