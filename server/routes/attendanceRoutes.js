const express = require("express");
const router = express.Router();
const {
  getAttendanceByStudent,
} = require("../controllers/attendanceController");

router.get("/:studentId", getAttendanceByStudent);

module.exports = router;
