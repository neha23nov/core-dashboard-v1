const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    refId: {
      type: String,
      required: true,
      unique: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    feeType: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "Card", "Online"],
      default: "Cash",
    },

    status: {
      type: String,
      enum: ["PAID", "PENDING"],
      default: "PAID",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);
