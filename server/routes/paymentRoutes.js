const express = require("express");
const Payment = require("../models/payment");
const Challan = require("../models/Challan");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { challanId, amount, mode } = req.body;

    const challan = await Challan.findById(challanId);
    if (!challan) {
      return res.status(404).json({ message: "Challan not found" });
    }

    if (amount > challan.dueAmount) {
      return res.status(400).json({ message: "Amount exceeds due" });
    }

    await Payment.create({
      challan: challan._id,
      student: challan.student,
      amount,
      mode,
    });

    challan.paidAmount += amount;
    challan.dueAmount = challan.totalAmount - challan.paidAmount;
    challan.status = challan.dueAmount === 0 ? "PAID" : "PARTIAL";

    await challan.save();

    res.json({ message: "Payment successful", challan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
