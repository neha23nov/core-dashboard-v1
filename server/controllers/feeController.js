const Fee = require("../models/Fee");

// 💰 Get fee history by student
exports.getFeesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const fees = await Fee.find({ studentId }).sort({ paidOn: -1 });

    const totalPaid = fees.reduce((sum, fee) => sum + fee.amount, 0);

    res.json({
      totalPaid,
      fees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
