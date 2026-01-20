const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");
const Student = require("../models/Student");

/**
 * COLLECT FEE
 */
router.post("/collect", async (req, res) => {
  try {
    const { studentId, feeType, amount, paymentMode } = req.body;

    if (!studentId || !feeType || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const fee = await Fee.create({
      refId: "TX" + Date.now(),
      student: student._id,
      feeType,
      amount,
      paymentMode,
      status: "PAID",
    });

    const populatedFee = await fee.populate("student", "fullName");

    res.status(201).json(populatedFee);
  } catch (err) {
    console.error("Collect fee error:", err);
    res.status(500).json({ message: "Fee collection failed" });
  }
});


/**
 * GET ALL FEES (Dashboard)
 */
router.get("/", async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student", "fullName studentId")
      .sort({ createdAt: -1 });

    res.json({ fees });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * EDIT TRANSACTION
 */
router.put("/:id", async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ message: "Transaction updated", fee });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PAYMENT HISTORY
 */
router.get("/history/payments", async (req, res) => {
  const payments = await Fee.find({ paidAmount: { $gt: 0 } })
    .populate("student", "fullName studentId");
  res.json({ payments });
});

/**
 * DUE HISTORY
 */
router.get("/history/dues", async (req, res) => {
  const dues = await Fee.find({ dueAmount: { $gt: 0 } })
    .populate("student", "fullName studentId");
  res.json({ dues });
});

// router.get("/fees/:id", getFeeById);



module.exports = router;
