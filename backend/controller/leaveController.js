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
  