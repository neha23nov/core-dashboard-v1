const express = require("express");
const router = express.Router();

const Fee = require("../models/Fee"); // ✅ MUST be default require
const Student = require("../models/Student");

router.post("/", async (req, res) => {
  try {
    const {
      studentId,
      feeType,
      date,
      totalAmount,
      concession,
      paymentMethod,
      remarks,
    } = req.body;

    if (!studentId || !feeType || !date || !totalAmount || !paymentMethod) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // ✅ FIND STUDENT BY studentId STRING
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(400).json({
        message: "Student not found",
      });
    }

    const netPayable = totalAmount - (concession || 0);

    const fee = await Fee.create({
      student: student._id,
      studentId: student.studentId,
      feeType,
      date,
      totalAmount,
      concession: concession || 0,
      netPayable,
      paymentMethod,
      remarks,
      refId: "TXN" + Date.now(),
      status: "PAID",
    });

    res.status(201).json({
      message: "Fee collected successfully",
      fee,
    });
  } catch (error) {
    console.error("Collect fee error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});


// GET ALL FEES
router.get("/", async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student", "fullName classSection")
      .sort({ createdAt: -1 });

    res.json(fees);
  } catch (error) {
    console.error("Fetch fees error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
