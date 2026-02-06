// Validate employee ID sent from frontend
export const validateEmployeeId = (req, res, next) => {
  const { employeeId } = req.body;

  // Check if employeeId exists and is a number
  if (!employeeId || isNaN(employeeId)) {
    return res.status(400).json({
      message: "Invalid employee ID"
    });
  }

  // If validation passes, move to the next function
  next();
};

// Validate leave request data
export const validateLeave = (req, res, next) => {
  const { employeeId, leaveDate, reason } = req.body;

  // Ensure all required fields are provided
  if (!employeeId || !leaveDate || !reason) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  // Continue to controller if validation passes
  next();
};
 