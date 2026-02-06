import express from "express";
import { addAttendanceCon, updateAttendanceCon, deleteAttendanceCon } from "../controller/attendanceController.js";

const router = express.Router();

router.post("/", addAttendanceCon);
router.patch("/:id", updateAttendanceCon);
router.delete("/:id", deleteAttendanceCon);

export default router;
