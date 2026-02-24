const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    challan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challan",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      default: "CASH",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
