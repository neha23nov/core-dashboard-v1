const express = require("express");
const router = express.Router();
const {
  addStudent,
  getStudents,
} = require("../controllers/studentController");

router.post("/", addStudent);   // Add student
router.get("/", getStudents);   // Get students + search

module.exports = router;
