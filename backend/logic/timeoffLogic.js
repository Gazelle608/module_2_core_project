// Function to validate time-off requests
export const validateTimeOffRequest = ({ employeeId, startDate, endDate, leaveType }) => {
  // Validate employee ID
  if (!employeeId || isNaN(employeeId)) throw new Error("Invalid employee ID");

  // Validate that start and end dates exist
  if (!startDate || !endDate) throw new Error("Start and end dates are required");

  // Check that start date is not after end date
  if (new Date(startDate) > new Date(endDate))
    throw new Error("Start date cannot be after end date");

  // Validate leave type
  const validLeaveTypes = ["Vacation", "Sick", "Unpaid"];
  if (!validLeaveTypes.includes(leaveType))
    throw new Error("Invalid leave type");

  // Return true if validation passes
  return true;
};
