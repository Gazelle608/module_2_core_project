import db from "../config/db.js";

// Insert a new leave request into the database
export const createLeaveRequest = (data, callback) => {
  const sql = `
    INSERT INTO leave_request 
    (Employee_id, Leave_date, Reason, Status)
    VALUES (?, ?, ?, 'Pending')
  `;

  // Save validated data to the database
  db.query(
    sql,
    [data.employeeId, data.leaveDate, data.reason],
    callback
  );
};
 