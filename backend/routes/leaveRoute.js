import express from "express";
import { createLeaveCon, updateLeaveCon, deleteLeaveCon } from "../controller/leaveController.js";

const router = express.Router();

router.post("/", createLeaveCon);
router.patch("/:id", updateLeaveCon);
router.delete("/:id", deleteLeaveCon);

export default router;

