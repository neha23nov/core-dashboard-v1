// controllers/challanController.js
const Challan = require("../models/Challan");

exports.createMonthlyChallan = async (req, res) => {
  try {
    const { studentId, month, tuitionFee, transportFee } = req.body;

    // ❌ prevent duplicate challan
    const existing = await Challan.findOne({ student: studentId, month });
    if (existing) {
      return res.status(400).json({ message: "Challan already exists" });
    }

    // 🔁 find last challan to carry dues
    const lastChallan = await Challan.findOne({ student: studentId }).sort({
      createdAt: -1,
    });

    const previousDue = lastChallan ? lastChallan.dueAmount : 0;

    const totalAmount = tuitionFee + transportFee + previousDue;

    const challan = await Challan.create({
      student: studentId,
      month,
      tuitionFee,
      transportFee,
      previousDue,
      totalAmount,
      paidAmount: 0,
      dueAmount: totalAmount,
      status: "DUE",
    });

    res.json(challan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
