const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentId: {
      type: String,
      required: true,
    },

    feeType: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    concession: {
      type: Number,
      default: 0,
    },

    netPayable: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online"],
      required: true,
    },

    remarks: {
      type: String,
    },

    refId: {
      type: String,
      required: true,
      unique: true,
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
